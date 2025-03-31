import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";
import { toast } from "@/hooks/use-toast";
import { detectWaste, WasteDetectionResult } from "@/services/wasteDetectionService";
import { useLanguage } from "../contexts/LanguageContext";

const WasteScanner = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState<WasteDetectionResult>({
    type: "",
    disposalMethod: "",
    recyclability: 0,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Clean up function to stop the stream when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
      
      toast({
        title: t('scanner.cameraStarted'),
        description: t('scanner.cameraActive'),
      });
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: t('scanner.cameraError'),
        description: t('scanner.checkPermissions'),
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const startScan = () => {
    setIsScanning(true);
    
    // If camera not started yet, start it first
    if (!stream) {
      startCamera().then(() => {
        // Give the camera a moment to initialize before capturing
        setTimeout(() => captureAndAnalyze(), 1500);
      });
    } else {
      captureAndAnalyze();
    }
  };

  const captureAndAnalyze = async () => {
    // Take a snapshot if canvas and video are available
    if (canvasRef.current && videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Set canvas size to match video dimensions
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        // Draw the current video frame to the canvas
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        try {
          // Convert canvas to base64 image
          const imageBase64 = canvasRef.current.toDataURL('image/jpeg');
          
          // Send to backend API
          const detectionResult = await detectWaste(imageBase64);
          
          // Process results
          setIsScanning(false);
          setHasResult(true);
          setResult(detectionResult);
          
          toast({
            title: "Item Identified",
            description: `Detected: ${detectionResult.type}`,
          });
        } catch (error) {
          console.error("Error analyzing image:", error);
          setIsScanning(false);
          
          toast({
            title: "Analysis failed",
            description: "Could not analyze the image. Please try again.",
            variant: "destructive",
          });
        }
      }
    } else {
      // If video isn't ready yet, try again in a moment
      setTimeout(() => captureAndAnalyze(), 500);
    }
  };

  const resetScan = () => {
    setIsScanning(false);
    setHasResult(false);
    setResult({
      type: "",
      disposalMethod: "",
      recyclability: 0,
    });
  };

  return (
    <section id="scanner" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI Waste Scanner</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our AI-powered scanner identifies your waste item and provides guidance on proper disposal methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-1 md:order-1">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted border border-border shadow-sm">
                <video 
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover ${!stream ? 'hidden' : ''}`}
                  autoPlay
                  playsInline
                  muted
                />
                
                <canvas 
                  ref={canvasRef} 
                  className="hidden" // Hidden canvas for capturing images
                />
                
                <div className="absolute inset-0">
                  {!stream && !isScanning && !hasResult && (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      </div>
                      <p className="text-lg font-medium mb-2">Camera Preview</p>
                      <p className="text-sm text-muted-foreground mb-4">Position your waste item in frame</p>
                      <Button onClick={startScan}>Start Camera</Button>
                    </div>
                  )}

                  {stream && !isScanning && !hasResult && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 flex justify-center">
                      <Button onClick={startScan} className="mr-2">Analyze Waste</Button>
                      <Button variant="outline" onClick={stopCamera}>Stop Camera</Button>
                    </div>
                  )}

                  {isScanning && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center h-full p-8 text-center text-white">
                      <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                      <p className="text-lg font-medium mb-2">Analyzing...</p>
                      <p className="text-sm mb-4">Our AI is identifying your waste item</p>
                      <Button variant="outline" onClick={resetScan}>Cancel</Button>
                    </div>
                  )}

                  {hasResult && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center h-full p-8 text-center text-white">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <p className="text-xl font-medium mb-1">Item Identified</p>
                      <p className="text-2xl font-semibold text-primary mb-4">{result.type}</p>
                      <div className="flex space-x-2">
                        <Button variant="primary" onClick={resetScan}>Scan Again</Button>
                        <Button variant="outline" onClick={stopCamera}>Close Camera</Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Camera frame overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M10,5 L5,5 L5,10 M90,5 L95,5 L95,10 M5,90 L5,95 L10,95 M95,90 L95,95 L90,95"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="order-2 md:order-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Waste Information</CardTitle>
                  <CardDescription>
                    Detailed information about the scanned waste item
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!hasResult ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Scan an item to get detailed disposal information
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Type
                        </h4>
                        <p className="text-xl font-semibold">{result.type}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Disposal Method
                        </h4>
                        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              </svg>
                            </div>
                            <span className="font-medium">{result.disposalMethod}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Recyclability
                        </h4>
                        <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${result.recyclability}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">Low</span>
                          <span className="text-xs font-medium">{result.recyclability}%</span>
                          <span className="text-xs text-muted-foreground">High</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Nearest Disposal Locations
                        </h4>
                        <a href="#map" className="w-full block">
                          <Button className="w-full">View on Map</Button>
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WasteScanner;
