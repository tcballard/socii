import { supabase, TABLES } from '../../config/supabase';
import { Connection, ConnectionStatus } from '../../utils/types';

export class ConnectionsService {
  static async getConnections(): Promise<Connection[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from(TABLES.CONNECTIONS)
      .select(`
        *,
        user:users!connections_user_id_fkey(id, username, display_name, avatar),
        connected_user:users!connections_connected_user_id_fkey(id, username, display_name, avatar)
      `)
      .or(`user_id.eq.${user.id},connected_user_id.eq.${user.id}`)
      .eq('status', 'accepted');

    if (error) throw error;
    return data || [];
  }

  static async getPendingRequests(): Promise<Connection[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from(TABLES.CONNECTIONS)
      .select(`
        *,
        user:users!connections_user_id_fkey(id, username, display_name, avatar)
      `)
      .eq('connected_user_id', user.id)
      .eq('status', 'pending');

    if (error) throw error;
    return data || [];
  }

  static async sendConnectionRequest(userId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from(TABLES.CONNECTIONS)
      .insert({
        user_id: user.id,
        connected_user_id: userId,
        status: 'pending',
      });

    if (error) throw error;
  }

  static async respondToConnectionRequest(
    connectionId: string, 
    accept: boolean
  ): Promise<void> {
    const status: ConnectionStatus = accept ? 'accepted' : 'blocked';
    
    const { error } = await supabase
      .from(TABLES.CONNECTIONS)
      .update({ status })
      .eq('id', connectionId);

    if (error) throw error;
  }

  static async removeConnection(connectionId: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.CONNECTIONS)
      .delete()
      .eq('id', connectionId);

    if (error) throw error;
  }

  static async searchUsers(query: string): Promise<any[]> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('id, username, display_name, avatar')
      .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
      .limit(20);

    if (error) throw error;
    return data || [];
  }
}