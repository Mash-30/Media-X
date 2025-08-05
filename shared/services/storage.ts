import { Storage } from 'aws-amplify';

export interface UploadResult {
  key: string;
  url: string;
}

class StorageService {
  private bucketName = 'mediax-storage-XXXXXXXXXX';

  // Upload image to S3
  async uploadImage(file: File | Blob, fileName: string): Promise<UploadResult> {
    try {
      const key = `images/${Date.now()}-${fileName}`;
      
      await Storage.put(key, file, {
        contentType: file.type,
        level: 'public',
      });

      const url = await Storage.get(key, {
        level: 'public',
      });

      return {
        key,
        url: url as string,
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file: File | Blob, userId: string): Promise<UploadResult> {
    try {
      const key = `profiles/${userId}/${Date.now()}-profile.jpg`;
      
      await Storage.put(key, file, {
        contentType: file.type,
        level: 'public',
      });

      const url = await Storage.get(key, {
        level: 'public',
      });

      return {
        key,
        url: url as string,
      };
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }

  // Delete file from S3
  async deleteFile(key: string): Promise<void> {
    try {
      await Storage.remove(key, {
        level: 'public',
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // Get file URL
  async getFileUrl(key: string): Promise<string> {
    try {
      const url = await Storage.get(key, {
        level: 'public',
      });
      return url as string;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  }

  // List files in a directory
  async listFiles(prefix: string): Promise<string[]> {
    try {
      const result = await Storage.list(prefix, {
        level: 'public',
      });
      return result.results.map(item => item.key);
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }
}

export const storageService = new StorageService(); 