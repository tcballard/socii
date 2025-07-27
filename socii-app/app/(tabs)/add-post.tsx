import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera, Image as ImageIcon, X, Send } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

export default function AddPostScreen() {
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need access to your photos to add them to your post.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      const totalImages = selectedImages.length + newImages.length;
      
      if (totalImages > 10) {
        Alert.alert('Too many photos', 'You can only add up to 10 photos per post.');
        return;
      }
      
      setSelectedImages(prev => [...prev, ...newImages]);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need access to your camera to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets) {
      if (selectedImages.length >= 10) {
        Alert.alert('Too many photos', 'You can only add up to 10 photos per post.');
        return;
      }
      
      setSelectedImages(prev => [...prev, result.assets[0].uri]);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePost = async () => {
    if (!content.trim() && selectedImages.length === 0) {
      Alert.alert('Empty post', 'Please add some content or photos to your post.');
      return;
    }

    setIsPosting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Simulate posting delay
    setTimeout(() => {
      setIsPosting(false);
      setContent('');
      setSelectedImages([]);
      Alert.alert('Posted!', 'Your post has been shared with your connections.');
    }, 2000);
  };

  const characterCount = content.length;
  const characterLimit = 500;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Share a moment</Text>
        <TouchableOpacity
          style={[styles.postButton, (!content.trim() && selectedImages.length === 0) && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={isPosting || (!content.trim() && selectedImages.length === 0)}
        >
          <Send size={16} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.postButtonText}>
            {isPosting ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            placeholder="What's happening with your family and friends?"
            placeholderTextColor="#9CA3AF"
            multiline
            value={content}
            onChangeText={setContent}
            maxLength={characterLimit}
            textAlignVertical="top"
          />
          
          <View style={styles.characterCounter}>
            <Text style={[
              styles.characterText,
              characterCount > characterLimit * 0.8 && styles.characterWarning,
              characterCount >= characterLimit && styles.characterError
            ]}>
              {characterCount}/{characterLimit}
            </Text>
          </View>
        </View>

        {selectedImages.length > 0 && (
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Photos ({selectedImages.length}/10)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
              {selectedImages.map((uri, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri }} style={styles.selectedImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <X size={16} color="#FFFFFF" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Add to your post</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={pickImages}>
              <ImageIcon size={24} color="#6B9BD2" strokeWidth={2} />
              <Text style={styles.actionButtonText}>Photo Library</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
              <Camera size={24} color="#6B9BD2" strokeWidth={2} />
              <Text style={styles.actionButtonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.privacySection}>
          <Text style={styles.privacyTitle}>Privacy</Text>
          <Text style={styles.privacyText}>
            This post will be visible to your connections only. No algorithms, no strangers - just the people who matter to you.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: 'Inter-Bold',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B9BD2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  postButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    minHeight: 120,
    fontFamily: 'Inter-Regular',
  },
  characterCounter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  characterText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  characterWarning: {
    color: '#F59E0B',
  },
  characterError: {
    color: '#DC2626',
  },
  imageSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  imageScroll: {
    marginHorizontal: -4,
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 4,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0C4A6E',
    fontFamily: 'Inter-SemiBold',
  },
  privacySection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  privacyText: {
    fontSize: 13,
    color: '#166534',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
});