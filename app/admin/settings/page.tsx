"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Settings as SettingsIcon,
    Store,
    CreditCard,
    Shield,
    Bell,
    Palette,
    UserPlus
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { supabase } from "@/lib/supabase/client"
import { addAdminUser } from "@/lib/supabase/auth"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        storeName: "De-chickins",
        storeDescription: "Premium clothing collection for fashion-forward individuals",
        currency: "₦",
        enableNotifications: true,
        enableEmails: true,
        taxRate: "7.5",
        shippingCost: "1500"
    })
    const [newAdminEmail, setNewAdminEmail] = useState("")
    const [adminMessage, setAdminMessage] = useState<{ type: string; text: string } | null>(null)
    const router = useRouter()
    const { user, isAdmin: isAdminUser, loading: authLoading } = useAuth()

    useEffect(() => {
        // DISABLE AUTH FOR DEVELOPMENT - bypass authentication check
        // Uncomment the following lines to re-enable authentication:
        /*
        const checkAdminAccess = async () => {
            // Wait for auth state to load
            if (authLoading) {
                return
            }

            // If user is not admin, redirect to home
            if (!isAdminUser) {
                router.push("/")
                return
            }
        }

        checkAdminAccess()
        */
    }, [isAdminUser, authLoading, router])

    const handleSave = () => {
        // In a real app, this would save to a database
        alert("Settings saved successfully!")
    }

    const handleChange = (field: string, value: string | boolean) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    const handleAddAdmin = async () => {
        if (!newAdminEmail) {
            setAdminMessage({ type: "error", text: "Please enter an email address" })
            return
        }

        // Check if Supabase client is initialized
        if (!supabase) {
            setAdminMessage({ type: "error", text: "Supabase client not initialized" })
            return
        }

        try {
            // First, find the user by email in the auth.users table
            const { data: users, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('email', newAdminEmail)

            if (userError || !users || users.length === 0) {
                setAdminMessage({ type: "error", text: "User not found. Please check the email address." })
                return
            }

            const userId = users[0].id

            // Update user's profile type to admin using our helper function
            const result = await addAdminUser(userId)

            if (result.error) {
                // Handle error properly
                if (result.error instanceof Error) {
                    setAdminMessage({ type: "error", text: "Failed to add admin user: " + result.error.message })
                } else {
                    setAdminMessage({ type: "error", text: "Failed to add admin user" })
                }
            } else {
                setAdminMessage({ type: "success", text: "Admin user added successfully!" })
                setNewAdminEmail("")
            }
        } catch (error) {
            setAdminMessage({ type: "error", text: "An error occurred: " + (error as Error).message })
        }
    }

    // DISABLE AUTH FOR DEVELOPMENT - bypass authentication check
    // Uncomment the following lines to re-enable authentication:
    /*
    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-amber-900">Checking access...</p>
            </div>
        )
    }

    if (!isAdminUser) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-amber-900">Access denied. Admin privileges required.</p>
            </div>
        )
    }
    */

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-amber-900">Settings</h2>
                <p className="text-amber-900/70">Manage your store configuration and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Settings Navigation */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-amber-900">Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <nav className="space-y-2">
                            <a href="#general" className="flex items-center px-3 py-2 text-sm font-medium text-amber-900 bg-amber-100 rounded-lg">
                                <Store className="w-4 h-4 mr-3" />
                                General
                            </a>
                            <a href="#payments" className="flex items-center px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50 rounded-lg">
                                <CreditCard className="w-4 h-4 mr-3" />
                                Payments
                            </a>
                            <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50 rounded-lg">
                                <Shield className="w-4 h-4 mr-3" />
                                Security
                            </a>
                            <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50 rounded-lg">
                                <Bell className="w-4 h-4 mr-3" />
                                Notifications
                            </a>
                            <a href="#appearance" className="flex items-center px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50 rounded-lg">
                                <Palette className="w-4 h-4 mr-3" />
                                Appearance
                            </a>
                            <a href="#admin" className="flex items-center px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50 rounded-lg">
                                <UserPlus className="w-4 h-4 mr-3" />
                                Admin Management
                            </a>
                        </nav>
                    </CardContent>
                </Card>

                {/* Settings Form */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-amber-900 flex items-center">
                            <SettingsIcon className="w-5 h-5 mr-2" />
                            General Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* General Settings */}
                            <div id="general">
                                <h3 className="text-lg font-medium text-amber-900 mb-4">Store Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="storeName" className="text-amber-900">Store Name</Label>
                                        <Input
                                            id="storeName"
                                            value={settings.storeName}
                                            onChange={(e) => handleChange("storeName", e.target.value)}
                                            className="border-amber-300 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="storeDescription" className="text-amber-900">Store Description</Label>
                                        <Textarea
                                            id="storeDescription"
                                            value={settings.storeDescription}
                                            onChange={(e) => handleChange("storeDescription", e.target.value)}
                                            rows={3}
                                            className="border-amber-300 focus:ring-amber-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Financial Settings */}
                            <div id="payments">
                                <h3 className="text-lg font-medium text-amber-900 mb-4">Financial Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="currency" className="text-amber-900">Currency</Label>
                                        <Input
                                            id="currency"
                                            value={settings.currency}
                                            onChange={(e) => handleChange("currency", e.target.value)}
                                            className="border-amber-300 focus:ring-amber-500 w-24"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="taxRate" className="text-amber-900">Tax Rate (%)</Label>
                                        <Input
                                            id="taxRate"
                                            type="number"
                                            value={settings.taxRate}
                                            onChange={(e) => handleChange("taxRate", e.target.value)}
                                            className="border-amber-300 focus:ring-amber-500 w-24"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="shippingCost" className="text-amber-900">Standard Shipping Cost (₦)</Label>
                                        <Input
                                            id="shippingCost"
                                            type="number"
                                            value={settings.shippingCost}
                                            onChange={(e) => handleChange("shippingCost", e.target.value)}
                                            className="border-amber-300 focus:ring-amber-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div id="notifications">
                                <h3 className="text-lg font-medium text-amber-900 mb-4">Notifications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="enableNotifications" className="text-amber-900">Email Notifications</Label>
                                            <p className="text-sm text-amber-900/70">Receive email notifications for important events</p>
                                        </div>
                                        <Switch
                                            id="enableNotifications"
                                            checked={settings.enableNotifications}
                                            onCheckedChange={(checked: boolean) => handleChange("enableNotifications", checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="enableEmails" className="text-amber-900">Marketing Emails</Label>
                                            <p className="text-sm text-amber-900/70">Send promotional emails to customers</p>
                                        </div>
                                        <Switch
                                            id="enableEmails"
                                            checked={settings.enableEmails}
                                            onCheckedChange={(checked: boolean) => handleChange("enableEmails", checked)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Admin Management */}
                            <div id="admin">
                                <h3 className="text-lg font-medium text-amber-900 mb-4">Admin Management</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="newAdminEmail" className="text-amber-900">Add New Admin User</Label>
                                        <div className="flex gap-2 mt-1">
                                            <Input
                                                id="newAdminEmail"
                                                type="email"
                                                value={newAdminEmail}
                                                onChange={(e) => setNewAdminEmail(e.target.value)}
                                                placeholder="user@example.com"
                                                className="border-amber-300 focus:ring-amber-500 flex-1"
                                            />
                                            <Button
                                                onClick={handleAddAdmin}
                                                className="bg-amber-700 hover:bg-amber-800 text-white"
                                            >
                                                Add Admin
                                            </Button>
                                        </div>
                                        {adminMessage && (
                                            <div className={`mt-2 p-2 rounded text-sm ${adminMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                {adminMessage.text}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-amber-900/70">
                                        Enter the email address of a registered user to grant them admin privileges.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={handleSave}
                                    className="bg-amber-700 hover:bg-amber-800 text-white"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}