---
name: mobile-first-patterns
description: "Mobile application development rules for React Native, Flutter, and iOS/Android."
version: 1.0.0
---

# Mobile-First Patterns Guidelines

This skill is invoked for mobile app development or mobile-web responsive design.

## Core Directives

1. **Touch Targets & Ergonomics:**
   - All interactive elements (buttons, links) must have a minimum touch target size of 44x44 pixels (Apple HIG) or 48x48 dp (Material Design).
   - Position primary actions at the bottom of the screen to be easily reachable by the thumb.

2. **Offline-First & Caching:**
   - Implement caching strategies (e.g., AsyncStorage, SQLite) so the app remains partially usable when the device loses network connection.
   - Provide clear, user-friendly UI indicators when the app is offline or syncing.

3. **Performance & Battery Optimization:**
   - Avoid continuous polling of APIs. Use WebSockets, Server-Sent Events, or Push Notifications for real-time data.
   - Optimize image loading by using appropriate formats (WebP) and strict caching to save cellular data and battery life.
