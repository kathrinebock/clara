/**
 * Figma Design Tokens Sync
 * Fetches design tokens directly from Figma API with caching
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class FigmaTokenSync {
  constructor(fileId, accessToken, cacheDuration = 5 * 60 * 1000) {
    this.fileId = fileId;
    this.accessToken = accessToken;
    this.cacheDuration = cacheDuration; // 5 minutes default
    this.cache = null;
    this.lastSync = null;
    this.isSyncing = false;
    this.baseUrl = 'https://api.figma.com/v1';

    console.log('🎨 Figma Token Sync initialized');
    console.log(`📁 File ID: ${fileId.substring(0, 10)}...`);
    console.log(`⏱️  Cache duration: ${cacheDuration / 1000}s`);
  }

  /**
   * Check if cache is still valid
   */
  isCacheValid() {
    if (!this.cache || !this.lastSync) return false;
    const now = Date.now();
    return (now - this.lastSync) < this.cacheDuration;
  }

  /**
   * Parse Figma design tokens from components and variables
   * This extracts color, typography, spacing info from the Figma file
   */
  parseTokensFromFigma(fileData) {
    const tokens = {
      colors: {
        primitives: {},
        semantic: {}
      },
      spacing: {},
      typography: {},
      effects: {},
      breakpoints: {}
    };

    try {
      // Extract from components if available
      if (fileData.components) {
        Object.entries(fileData.components).forEach(([key, component]) => {
          // Parse component names for tokens
          // e.g., "color/red/600" or "typography/h1"
          const parts = component.name.split('/');
          
          if (parts[0] === 'color' && parts.length >= 3) {
            if (!tokens.colors.primitives[parts[1]]) {
              tokens.colors.primitives[parts[1]] = {};
            }
            // You would extract actual color value from the component
            // This is a placeholder - actual implementation depends on your Figma setup
          }
        });
      }

      // Extract from styles if available
      if (fileData.styles) {
        Object.entries(fileData.styles).forEach(([key, style]) => {
          // Parse style names
          const parts = style.name.split('/');
          
          if (parts[0] === 'typography' && parts.length >= 2) {
            if (!tokens.typography[parts[1]]) {
              tokens.typography[parts[1]] = {};
            }
          }
        });
      }

      return tokens;
    } catch (error) {
      console.error('❌ Error parsing tokens from Figma:', error.message);
      return tokens;
    }
  }

  /**
   * Sync tokens from Figma API
   */
  async sync() {
    // Prevent multiple concurrent syncs
    if (this.isSyncing) {
      console.log('⏳ Sync already in progress...');
      return this.cache;
    }

    this.isSyncing = true;

    try {
      console.log('🔄 Syncing tokens from Figma...');
      
      const response = await fetch(`${this.baseUrl}/files/${this.fileId}`, {
        headers: {
          'X-FIGMA-TOKEN': this.accessToken
        }
      });

      if (!response.ok) {
        throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
      }

      const file = await response.json();
      
      console.log(`✅ Successfully fetched Figma file: ${file.name}`);
      console.log(`📊 File has ${Object.keys(file.components || {}).length} components`);

      // Parse tokens from the Figma file
      const parsedTokens = this.parseTokensFromFigma(file);

      // Update cache
      this.cache = {
        source: 'figma',
        fileName: file.name,
        lastSyncTime: new Date().toISOString(),
        tokens: parsedTokens,
        raw: file // Store raw data for debugging
      };

      this.lastSync = Date.now();
      
      console.log('✨ Tokens synced successfully');
      console.log(`📦 Cached: ${JSON.stringify(this.cache).length} bytes`);
      
      return this.cache;

    } catch (error) {
      console.error('❌ Figma sync error:', error.message);
      
      // Return cached data if sync fails (graceful fallback)
      if (this.cache) {
        console.log('💾 Using cached tokens from previous sync');
        return this.cache;
      }
      
      throw new Error(`Failed to sync Figma tokens: ${error.message}`);
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Get tokens (sync if cache expired)
   */
  async getTokens() {
    if (!this.isCacheValid()) {
      await this.sync();
    }
    return this.cache;
  }

  /**
   * Manual sync trigger
   */
  async forceSyncNow() {
    console.log('🚀 Force sync triggered');
    this.lastSync = null; // Invalidate cache
    return await this.sync();
  }

  /**
   * Start auto-sync interval
   */
  startAutoSync(intervalMs = this.cacheDuration) {
    console.log(`⏰ Starting auto-sync every ${intervalMs / 1000}s`);
    
    // Initial sync
    this.sync().catch(err => console.error('Initial sync failed:', err.message));

    // Set up interval
    this.syncInterval = setInterval(() => {
      if (!this.isSyncing) {
        this.sync().catch(err => console.error('Auto-sync failed:', err.message));
      }
    }, intervalMs);

    return this.syncInterval;
  }

  /**
   * Stop auto-sync
   */
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('⏹️  Auto-sync stopped');
    }
  }

  /**
   * Get cache status
   */
  getStatus() {
    return {
      hasFigmaConfig: !!(this.fileId && this.accessToken),
      isCached: this.cache !== null,
      isCacheValid: this.isCacheValid(),
      lastSyncTime: this.lastSync ? new Date(this.lastSync).toISOString() : null,
      cacheAge: this.lastSync ? Date.now() - this.lastSync : null,
      cacheDuration: this.cacheDuration,
      isSyncing: this.isSyncing
    };
  }
}

module.exports = FigmaTokenSync;
