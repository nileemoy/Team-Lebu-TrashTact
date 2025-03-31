
/**
 * Service for communicating with the waste detection backend API
 */
export interface WasteDetectionResult {
  type: string;
  disposalMethod: string;
  recyclability: number;
}

/**
 * Send an image to the backend for waste detection
 * @param imageBase64 - Base64 encoded image data
 * @returns Promise with the detection result
 */
export const detectWaste = async (imageBase64: string): Promise<WasteDetectionResult> => {
  try {
    // The API endpoint where our Flask server is running
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/detect-waste';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze waste');
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error detecting waste:', error);
    
    // Fallback to mock data if backend call fails
    return {
      type: 'Sample Waste Item',
      disposalMethod: 'Backend connection failed - showing sample data',
      recyclability: 50
    };
  }
};
