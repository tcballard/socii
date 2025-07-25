# Socii - Active Tasks

**Version**: 1.0  
**Date**: July 25, 2025  
**Status**: Active  
**Last Updated**: July 25, 2025

---

## Executive Summary

This document tracks active development tasks for Socii, organized by priority and aligned with the PRD requirements and development timeline. Tasks are categorized by phase, with current focus on MVP development (Phase 1).

**Current Phase**: MVP Development (Months 1-3)  
**Target**: 1,000 beta users with core functionality

---

## 🚀 Phase 1: MVP Development (Months 1-3)

### 🔥 High Priority - Foundation Setup

#### Development Environment
- [ ] **Task 1.1**: Set up Expo project with TypeScript
  - **Status**: Not Started
  - **Owner**: Development Team
  - **Timeline**: Week 1
  - **Dependencies**: None
  - **Acceptance Criteria**: 
    - Expo project created with TypeScript
    - Basic folder structure established
    - Development environment configured
  - **Notes**: Use latest Expo SDK (52+)

- [ ] **Task 1.2**: Configure Supabase with basic schema
  - **Status**: Not Started
  - **Owner**: Backend Developer
  - **Timeline**: Week 1-2
  - **Dependencies**: Task 1.1
  - **Acceptance Criteria**:
    - Supabase project created
    - Database schema designed and implemented
    - Row Level Security (RLS) policies configured
    - Basic API endpoints tested
  - **Database Tables Required**:
    - Users (profile, privacy settings, subscription status)
    - Connections (mutual relationships, categories)
    - Posts (content, privacy settings, engagement)
    - Media (photo/video storage with privacy controls)
    - Subscriptions (RevenueCat integration, tier management)

#### Authentication & Security
- [ ] **Task 1.3**: Implement authentication flow
  - **Status**: Not Started
  - **Owner**: Full Stack Developer
  - **Timeline**: Week 2-3
  - **Dependencies**: Task 1.2
  - **Acceptance Criteria**:
    - Email/password authentication working
    - Social login options (Google, Apple)
    - MFA implementation
    - Session management
    - Privacy controls for user data
  - **PRD Alignment**: Privacy-first approach, GDPR compliance

### 🔥 High Priority - Core Features

#### Connection Management
- [ ] **Task 1.4**: Build connection management system
  - **Status**: Not Started
  - **Owner**: Full Stack Developer
  - **Timeline**: Week 3-4
  - **Dependencies**: Task 1.3
  - **Acceptance Criteria**:
    - Add/remove connections with mutual consent
    - Connection categories (family, close friends, etc.)
    - Connection limits based on subscription tier
    - Mute/archive functionality
    - Connection status indicators
  - **PRD Alignment**: Tiered connection system (25/50/100/150 limits)

#### Feed System
- [ ] **Task 1.5**: Create chronological feed
  - **Status**: Not Started
  - **Owner**: Frontend Developer
  - **Timeline**: Week 4-5
  - **Dependencies**: Task 1.4
  - **Acceptance Criteria**:
    - Pure chronological timeline (no algorithms)
    - Timestamp visibility
    - Catch-up mode for missed posts
    - Real-time updates via Supabase Realtime
    - Performance: <1 second refresh time
  - **PRD Alignment**: Addresses algorithm frustration, Sarah persona needs

#### Content Sharing
- [ ] **Task 1.6**: Add photo/video sharing
  - **Status**: Not Started
  - **Owner**: Full Stack Developer
  - **Timeline**: Week 5-6
  - **Dependencies**: Task 1.5
  - **Acceptance Criteria**:
    - Photo upload (up to 10 per post)
    - Video upload with compression
    - Text posts (500 character limit)
    - Life events sharing
    - No resharing functionality
    - Privacy controls per post
  - **PRD Alignment**: Content sharing limits, privacy controls

### 🔥 High Priority - Business Integration

#### Payment System
- [ ] **Task 1.7**: Integrate Stripe + RevenueCat
  - **Status**: Not Started
  - **Owner**: Backend Developer
  - **Timeline**: Week 6-7
  - **Dependencies**: Task 1.6
  - **Acceptance Criteria**:
    - Stripe payment processing integrated
    - RevenueCat subscription management
    - Tiered pricing implementation
    - 30-day free trial functionality
    - Payment webhook handling
    - Subscription status tracking
  - **Pricing Tiers**:
    - Inner Circle: $2.99/month (25 connections)
    - Close Friends: $4.99/month (50 connections)
    - Full Circle: $7.99/month (100 connections)
    - Family Plan: $9.99/month (150 connections, 5 accounts)

#### Analytics Setup
- [ ] **Task 1.8**: Set up PostHog analytics with privacy controls
  - **Status**: Not Started
  - **Owner**: Full Stack Developer
  - **Timeline**: Week 7-8
  - **Dependencies**: Task 1.7
  - **Acceptance Criteria**:
    - PostHog self-hosted instance configured
    - Privacy controls implemented
    - Key metrics tracking:
      - Trial starts and conversions
      - Connection additions
      - Post engagement
      - Session duration
    - GDPR compliance features enabled
  - **PRD Alignment**: Success metrics tracking, privacy-first approach

### 🔥 High Priority - User Experience

#### Notifications
- [ ] **Task 1.9**: Basic push notifications
  - **Status**: Not Started
  - **Owner**: Mobile Developer
  - **Timeline**: Week 8-9
  - **Dependencies**: Task 1.8
  - **Acceptance Criteria**:
    - New post notifications
    - Connection request alerts
    - Message notifications
    - Custom notification sounds
    - Notification preferences
  - **PRD Alignment**: Engagement features, user agency

#### Basic Messaging
- [ ] **Task 1.10**: Implement basic messaging
  - **Status**: Not Started
  - **Owner**: Full Stack Developer
  - **Timeline**: Week 9-10
  - **Dependencies**: Task 1.9
  - **Acceptance Criteria**:
    - Direct messaging between connections
    - Message history
    - Read receipts
    - Message privacy controls
    - E2E encryption for messages
  - **PRD Alignment**: Privacy-first messaging, connection intimacy

---

## 📊 Phase 1 Success Metrics

### MVP Validation Criteria
- [ ] **Metric 1.1**: >50% retention at 1 month
- [ ] **Metric 1.2**: Sessions averaging 5-10 minutes
- [ ] **Metric 1.3**: >70% beta users add 10+ connections in week 1
- [ ] **Metric 1.4**: >25% trial-to-paid conversion rate
- [ ] **Metric 1.5**: <2 second page load times
- [ ] **Metric 1.6**: <5 second image upload times

### Technical Requirements
- [ ] **Requirement 1.1**: 99.9% uptime SLA
- [ ] **Requirement 1.2**: GDPR compliance implemented
- [ ] **Requirement 1.3**: Security audit completed
- [ ] **Requirement 1.4**: Performance benchmarks met

---

## 🔄 Phase 2: Enhancement (Months 4-6)

### Medium Priority - Post-MVP Features

#### Advanced Privacy Controls
- [ ] **Task 2.1**: Enhanced privacy controls
  - **Status**: Not Started
  - **Owner**: Full Stack Developer
  - **Timeline**: Month 4
  - **Dependencies**: Phase 1 completion
  - **Acceptance Criteria**:
    - Granular privacy settings
    - Data export functionality
    - Account deletion process
    - Privacy audit tools
  - **PRD Alignment**: Transparency first pillar

#### Mobile Apps
- [ ] **Task 2.2**: Native mobile app development
  - **Status**: Not Started
  - **Owner**: Mobile Developer
  - **Timeline**: Month 4-5
  - **Dependencies**: Phase 1 completion
  - **Acceptance Criteria**:
    - iOS app (iOS 14+)
    - Android app (Android 8+)
    - App store submissions
    - Beta testing setup
  - **PRD Alignment**: Platform support requirements

#### Performance Optimization
- [ ] **Task 2.3**: Performance optimization
  - **Status**: Not Started
  - **Owner**: Full Stack Developer
  - **Timeline**: Month 5
  - **Dependencies**: Task 2.2
  - **Acceptance Criteria**:
    - Load time optimization
    - Image compression improvements
    - Database query optimization
    - Caching implementation
  - **PRD Alignment**: Performance requirements

---

## 🚀 Phase 3: Scale (Months 7-12)

### Future Features - Not Yet Started

#### Group Features
- [ ] **Task 3.1**: Group conversations (max 25 people)
- [ ] **Task 3.2**: Event planning tools
- [ ] **Task 3.3**: Shared photo albums

#### Advanced Features
- [ ] **Task 3.4**: Video calling integration
- [ ] **Task 3.5**: Advanced monitoring
- [ ] **Task 3.6**: Compliance certification (SOC 2 Type II)

---

## 📋 Current Sprint Focus

### Week 1-2: Foundation
**Priority**: Get development environment and basic infrastructure running
- [ ] Task 1.1: Set up Expo project with TypeScript
- [ ] Task 1.2: Configure Supabase with basic schema

### Week 3-4: Core Authentication
**Priority**: Establish secure user authentication
- [ ] Task 1.3: Implement authentication flow
- [ ] Task 1.4: Build connection management system

### Week 5-6: Core Features
**Priority**: Build the main social features
- [ ] Task 1.5: Create chronological feed
- [ ] Task 1.6: Add photo/video sharing

### Week 7-8: Business Logic
**Priority**: Integrate payment and analytics
- [ ] Task 1.7: Integrate Stripe + RevenueCat
- [ ] Task 1.8: Set up PostHog analytics

### Week 9-10: Polish & Launch Prep
**Priority**: Final features and launch preparation
- [ ] Task 1.9: Basic push notifications
- [ ] Task 1.10: Implement basic messaging

---

## 🎯 Success Criteria

### MVP Launch Criteria
- [ ] All Phase 1 tasks completed
- [ ] 1,000 beta users recruited
- [ ] Core functionality working
- [ ] Payment system operational
- [ ] Analytics tracking implemented
- [ ] Privacy controls in place

### Beta Validation Criteria
- [ ] >50% retention at 1 month
- [ ] >25% trial-to-paid conversion
- [ ] >70% users add 10+ connections
- [ ] Session duration 5-10 minutes
- [ ] Performance benchmarks met

---

## 📝 Notes & Decisions

### Technical Decisions Made
- **PostHog**: Confirmed for product analytics (self-hosted for privacy)
- **Expo**: Confirmed for cross-platform development
- **Supabase**: Confirmed for backend-as-a-service
- **RevenueCat + Stripe**: Confirmed for subscription management

### PRD Alignment Notes
- All tasks align with privacy-first approach
- Connection limits enforce intimacy over scale
- Chronological feed addresses algorithm frustration
- Pricing tiers match PRD specifications
- Success metrics track PRD validation hypotheses

### Risk Mitigation
- **Technical Risks**: Start with proven infrastructure (Supabase, Expo)
- **Timeline Risks**: 3-month MVP timeline is aggressive but achievable
- **User Acquisition**: Focus on family units for initial growth
- **Privacy Risks**: Implement security-first architecture

---

## 🔄 Task Updates

### Last Updated: July 25, 2025
- **Created**: Initial task list based on PRD and development timeline
- **Next Review**: Weekly during development
- **Status**: Ready to begin Phase 1 development

---

## 📞 Next Steps

1. **Immediate**: Begin Task 1.1 (Expo project setup)
2. **This Week**: Complete foundation setup (Tasks 1.1-1.2)
3. **Next Week**: Start authentication implementation (Task 1.3)
4. **Ongoing**: Weekly task reviews and progress updates

**Ready to start development! 🚀** 