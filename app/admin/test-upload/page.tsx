"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadProductImage } from "@/lib/product-manager"

export default function TestUploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [logs, setLogs] = useState<string[]>([])

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
        console.log(message);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setResult(null)
            setError(null)
            setLogs([])
            addLog(`Selected file: ${e.target.files[0].name} (${(e.target.files[0].size / 1024).toFixed(2)} KB)`);
        }
    }

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first")
            return
        }

        setUploading(true)
        setError(null)
        setResult(null)
        setLogs([])

        addLog("Starting upload process...");

        try {
            addLog("Calling uploadProductImage function...");
            const url = await uploadProductImage(file, file.name)

            if (url) {
                addLog(`Success! Image uploaded to: ${url}`);
                setResult(`Success! Image uploaded to: ${url}`)
            } else {
                addLog("Upload failed. Check console for details.");
                setError("Upload failed. Check console for details.")
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            addLog(`Upload failed: ${errorMessage}`);
            console.error("Upload error:", err);
            setError(`Upload failed: ${errorMessage}`);
        } finally {
            setUploading(false)
            addLog("Upload process completed.");
        }
    }

    return (
        <div className="min-h-screen bg-amber-50 p-6">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Test Image Upload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="image">Select Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1"
                        />
                    </div>

                    <Button
                        onClick={handleUpload}
                        disabled={uploading || !file}
                        className="w-full"
                    >
                        {uploading ? "Uploading..." : "Upload Image"}
                    </Button>

                    {result && (
                        <div className="p-3 bg-green-100 text-green-800 rounded">
                            {result}
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-100 text-red-800 rounded">
                            {error}
                        </div>
                    )}

                    {logs.length > 0 && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                            <h3 className="font-medium text-amber-900 mb-2">Upload Logs:</h3>
                            <ul className="text-sm text-amber-900/80 space-y-1 max-h-40 overflow-y-auto">
                                {logs.map((log, index) => (
                                    <li key={index}>{log}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="text-sm text-amber-900/70">
                        <p>This is a test page to debug image upload issues.</p>
                        <p>Check the browser console for detailed logs.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}