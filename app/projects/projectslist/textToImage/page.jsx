'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Download, Wand2 } from 'lucide-react';

const TextToImageGenerator = () => {
  const [prompt, setPrompt] = useState('A cat holding a sign that says hello world');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generationTime, setGenerationTime] = useState(0);
  
  // Advanced settings
  const [height, setHeight] = useState(1024);
  const [width, setWidth] = useState(1024);
  const [guidanceScale, setGuidanceScale] = useState(3.5);
  const [numSteps, setNumSteps] = useState(7);
  const [seed, setSeed] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      const response = await fetch('https://texttoimage-backend-wi69.onrender.com/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          height,
          width,
          guidance_scale: guidanceScale,
          num_inference_steps: numSteps,
          max_sequence_length: 512,
          seed
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate image');
      }

      const data = await response.json();
      setGeneratedImage(data.image_base64);
      setGenerationTime(data.generation_time);
    } catch (err) {
      setError(err.message || 'An error occurred while generating the image');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const randomizeSeed = () => {
    setSeed(Math.floor(Math.random() * 10000));
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold rent mb-2">
            AI Text-to-Image Generator
          </h1>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Generate Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe what you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full"
                >
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
                </Button>

                {showAdvanced && (
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(parseInt(e.target.value) || 1024)}
                          min="256"
                          max="2048"
                          step="64"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(parseInt(e.target.value) || 1024)}
                          min="256"
                          max="2048"
                          step="64"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Guidance Scale: {guidanceScale}</Label>
                      <Slider
                        value={[guidanceScale]}
                        onValueChange={(value) => setGuidanceScale(value[0])}
                        max={10}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Inference Steps: {numSteps}</Label>
                      <Slider
                        value={[numSteps]}
                        onValueChange={(value) => setNumSteps(value[0])}
                        max={20}
                        min={5}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seed">Seed</Label>
                      <div className="flex gap-2">
                        <Input
                          id="seed"
                          type="number"
                          value={seed}
                          onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                          min="0"
                        />
                        <Button type="button" variant="outline" onClick={randomizeSeed}>
                          Random
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={generateImage}
                disabled={isLoading || !prompt.trim()}
                className="w-full "
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated Image
                {generatedImage && (
                  <div className="flex items-center gap-2">
                    {typeof generationTime === 'number' ? (
  <span className="text-sm text-gray-500">
    {generationTime.toFixed(1)}s
  </span>
) : null}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadImage}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Card className="aspect-square rounded-lg overflow-hidden flex items-center justify-center">
                {isLoading ? (
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-purple-600" />
                    <p className="text-gray-600">Generating your image...</p>
                    <p className="text-sm text-gray-500 mt-1">This may take a few minutes</p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={`data:image/png;base64,${generatedImage}`}
                    alt="Generated"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <Wand2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Your generated image will appear here</p>
                  </div>
                )}
              </Card>
            </CardContent>
          </Card>
          
        </div>
        <p className="text-gray-400 text-right mt-4 text-sm">Powered by FLUX.1-dev from Hugging Face</p>
      </div>
    </div>
  );
};

export default TextToImageGenerator;