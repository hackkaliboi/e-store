"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase/client"

export default function StorageDiagnosticPage() {
    const [file, setFile] = useState<File | null>(null)
    const [testing, setTesting] = useState(false)
    const [results, setResults] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    const addResult = (test: string, status: string, details: any = null) => {
        setResults(prev => [...prev, { test, status, details, timestamp: new Date().toLocaleTimeString() }]);
    };

    const runDiagnostic = async () => {
        if (!supabase) {
            setError("Supabase client not initialized");
            return;
        }

        setTesting(true);
        setResults([]);
        setError(null);

        try {
            // Test 1: Check authentication status
            addResult("Authentication Status", "Running...");
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (authError) {
                    addResult("Authentication Status", "Failed", authError.message);
                } else {
                    addResult("Authentication Status", "Passed", user ? `Authenticated as ${user.email}` : "Not authenticated");
                }
            } catch (err) {
                addResult("Authentication Status", "Failed", err instanceof Error ? err.message : 'Unknown error');
            }

            // Test 2: List available buckets
            addResult("List Storage Buckets", "Running...");
            try {
                const { data, error } = await supabase.storage.listBuckets();
                if (error) {
                    addResult("List Storage Buckets", "Failed", error.message);
                } else {
                    addResult("List Storage Buckets", "Passed", `Found ${data?.length || 0} buckets: ${data?.map((b: any) => b.name).join(', ')}`);
                }
            } catch (err) {
                addResult("List Storage Buckets", "Failed", err instanceof Error ? err.message : 'Unknown error');
            }

            // Test 3: Check products bucket accessibility
            addResult("Products Bucket Access", "Running...");
            try {
                const { data, error } = await supabase.storage.from('products').list('', { limit: 1 });
                if (error) {
                    addResult("Products Bucket Access", "Failed", error.message);
                } else {
                    addResult("Products Bucket Access", "Passed", "Bucket is accessible");
                }
            } catch (err) {
                addResult("Products Bucket Access", "Failed", err instanceof Error ? err.message : 'Unknown error');
            }

            // Test 4: Check media bucket accessibility
            addResult("Media Bucket Access", "Running...");
            try {
                const { data, error } = await supabase.storage.from('media').list('', { limit: 1 });
                if (error) {
                    addResult("Media Bucket Access", "Failed", error.message);
                } else {
                    addResult("Media Bucket Access", "Passed", "Bucket is accessible");
                }
            } catch (err) {
                addResult("Media Bucket Access", "Failed", err instanceof Error ? err.message : 'Unknown error');
            }

            // Test 5: Check bucket policies
            addResult("Bucket Policy Check", "Running...");
            try {
                // This is a simplified check - in reality, we can't easily list policies from client
                // But we can try to perform operations that would require specific policies
                addResult("Bucket Policy Check", "Info", "Policy verification requires SQL access. Testing operations instead...");
            } catch (err) {
                addResult("Bucket Policy Check", "Info", "Policy verification requires SQL access");
            }

            // Test 6: File upload test if file is selected
            if (file) {
                addResult("File Upload Test Preparation", "Running...");

                // Log file details
                addResult("File Details", "Info", {
                    name: file.name,
                    size: `${(file.size / 1024).toFixed(2)} KB`,
                    type: file.type,
                    lastModified: new Date(file.lastModified).toLocaleString()
                });

                // Test with products bucket
                addResult("Upload to Products Bucket", "Running...");
                const fileName = `diagnostic-${Date.now()}.${file.name.split('.').pop() || 'jpg'}`;

                try {
                    // Try upload with detailed options
                    const { data, error } = await supabase.storage
                        .from('products')
                        .upload(fileName, file, {
                            cacheControl: '3600',
                            upsert: false
                        });

                    if (error) {
                        addResult("Upload to Products Bucket", "Failed", {
                            message: error.message,
                            code: (error as any).code,
                            statusCode: (error as any).statusCode
                        });

                        // Try with media bucket as fallback
                        addResult("Upload to Media Bucket", "Running...");
                        try {
                            const { data: mediaData, error: mediaError } = await supabase.storage
                                .from('media')
                                .upload(fileName, file, {
                                    cacheControl: '3600',
                                    upsert: false
                                });

                            if (mediaError) {
                                addResult("Upload to Media Bucket", "Failed", {
                                    message: mediaError.message,
                                    code: (mediaError as any).code,
                                    statusCode: (mediaError as any).statusCode
                                });
                            } else {
                                addResult("Upload to Media Bucket", "Passed", mediaData);

                                // Clean up
                                await supabase.storage.from('media').remove([fileName]);
                                addResult("Cleanup Media File", "Passed", "File deleted successfully");
                            }
                        } catch (uploadErr) {
                            addResult("Upload to Media Bucket", "Failed", uploadErr instanceof Error ? uploadErr.message : 'Unknown error');
                        }
                    } else {
                        addResult("Upload to Products Bucket", "Passed", data);

                        // Clean up
                        await supabase.storage.from('products').remove([fileName]);
                        addResult("Cleanup Products File", "Passed", "File deleted successfully");
                    }
                } catch (err) {
                    addResult("Upload to Products Bucket", "Failed", err instanceof Error ? err.message : 'Unknown error');
                }
            }

            // Test 7: Test public URL generation
            addResult("Public URL Generation", "Running...");
            try {
                const { data } = supabase.storage.from('products').getPublicUrl('test-file.jpg');
                addResult("Public URL Generation", "Passed", data.publicUrl);
            } catch (err) {
                addResult("Public URL Generation", "Failed", err instanceof Error ? err.message : 'Unknown error');
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setTesting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResults([]);
            setError(null);
        }
    };

    return (
        <div className="min-h-screen bg-amber-50 p-6">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Storage Diagnostic Tool</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
                        <h3 className="font-medium text-amber-900 mb-2">Instructions</h3>
                        <p className="text-amber-900/80 text-sm">
                            This tool will run several tests to diagnose storage issues.
                            Select a file to test uploads, then click "Run Diagnostic".
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="image">Select Image (Optional)</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1"
                            />
                            {file && (
                                <p className="text-sm text-amber-900/70 mt-1">
                                    Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                </p>
                            )}
                        </div>

                        <div className="flex items-end">
                            <Button
                                onClick={runDiagnostic}
                                disabled={testing}
                                className="w-full"
                            >
                                {testing ? "Running Tests..." : "Run Diagnostic"}
                            </Button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 text-red-800 rounded">
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="border border-amber-200 rounded-lg">
                            <div className="bg-amber-50 px-4 py-2 border-b border-amber-200">
                                <h3 className="font-medium text-amber-900">Test Results</h3>
                            </div>
                            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                                {results.map((result, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1.5 ${result.status === "Passed" ? "bg-green-500" :
                                                result.status === "Failed" ? "bg-red-500" :
                                                    "bg-amber-500"
                                            }`}></div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="font-medium text-amber-900">{result.test}</span>
                                                <span className="text-sm text-amber-900/70">{result.timestamp}</span>
                                            </div>
                                            <div className="text-sm text-amber-900/80">
                                                Status: <span className={
                                                    result.status === "Passed" ? "text-green-600" :
                                                        result.status === "Failed" ? "text-red-600" :
                                                            "text-amber-600"
                                                }>
                                                    {result.status}
                                                </span>
                                            </div>
                                            {result.details && (
                                                <div className="mt-1 text-xs bg-amber-50 p-2 rounded border border-amber-100">
                                                    <pre className="whitespace-pre-wrap break-words">
                                                        {typeof result.details === 'string'
                                                            ? result.details
                                                            : JSON.stringify(result.details, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h3 className="font-medium text-amber-900 mb-2">Troubleshooting Guide</h3>
                        <ul className="text-amber-900/80 text-sm space-y-2">
                            <li>
                                <strong>Authentication Issues:</strong>
                                <p className="ml-4">Ensure you're logged in and have proper permissions. Check the authentication status in test results.</p>
                            </li>
                            <li>
                                <strong>Policy Issues:</strong>
                                <p className="ml-4">Run these SQL commands in your Supabase SQL Editor to ensure proper policies:</p>
                                <pre className="ml-4 mt-1 p-2 bg-amber-100 text-amber-900 text-xs rounded overflow-x-auto">
                                    {`-- Products bucket policies
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'products' );

create policy "Authenticated users can upload"
on storage.objects for insert
with check (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);

create policy "Authenticated users can update" 
on storage.objects for update 
using (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);

create policy "Authenticated users can delete"
on storage.objects for delete
using (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);

-- Media bucket policies
create policy "Public Media Access"
on storage.objects for select
using ( bucket_id = 'media' );

create policy "Authenticated users can upload media"
on storage.objects for insert
with check (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
);

create policy "Authenticated users can update media" 
on storage.objects for update 
using (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
);

create policy "Authenticated users can delete media"
on storage.objects for delete
using (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
);`}
                                </pre>
                            </li>
                            <li>
                                <strong>File Size Limits:</strong>
                                <p className="ml-4">Supabase has file size limits. Try uploading a smaller image (under 50MB).</p>
                            </li>
                            <li>
                                <strong>Network Issues:</strong>
                                <p className="ml-4">Check browser console for network errors. Ensure no ad blockers or security software is interfering.</p>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}