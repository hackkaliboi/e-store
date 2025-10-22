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
    Palette
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        storeName: "DC Chickin",
        storeDescription: "Premium clothing collection for fashion-forward individuals",
        currency: "₦",
        enableNotifications: true,
        enableEmails: true,
        taxRate: "7.5",
        shippingCost: "1500"
    })
    const [isAdmin, setIsAdmin] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkAdminAccess = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            // For now, we'll allow access if user is logged in
            // In a production app, you would check if the user has admin privileges
            if (!user) {
                router.push("/admin/login")
                return
            }

            setIsAdmin(true)
        }

        checkAdminAccess()
    }, [router])

    const handleSave = () => {
        // In a real app, this would save to a database
        alert("Settings saved successfully!")
    }

    const handleChange = (field: string, value: string | boolean) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-amber-900">Checking access...</p>
            </div>
        )
    }

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
                        <form className="space-y-6">
                            <div>
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

                            <div>
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

                            <div>
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

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={handleSave}
                                    className="bg-amber-700 hover:bg-amber-800 text-white"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}