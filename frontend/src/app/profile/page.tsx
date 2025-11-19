'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, Shield, Edit } from 'lucide-react';
import Layout from '@/components/Layout';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    linkedin: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: (user as any).full_name || '',
        email: user.email || '',
        bio: (user as any).bio || '',
        location: (user as any).location || '',
        website: (user as any).website || '',
        github: (user as any).github || '',
        linkedin: (user as any).linkedin || ''
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.updateProfile({
        full_name: profileData.fullName,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website,
        github: profileData.github,
        linkedin: profileData.linkedin
      });

      alert('Cập nhật hồ sơ thành công!');
    } catch (error) {
      console.error('Lỗi cập nhật hồ sơ:', error);
      alert('Có lỗi xảy ra khi cập nhật hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    setLoading(true);

    try {
      await api.changePassword(passwordData.currentPassword, passwordData.newPassword);
      alert('Đổi mật khẩu thành công!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Lỗi đổi mật khẩu:', error);
      alert('Có lỗi xảy ra khi đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Vui lòng đăng nhập để xem hồ sơ</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" alt={(user as any).full_name || user.email} />
                <AvatarFallback className="text-2xl">
                  {((user as any).full_name || user.email)?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {(user as any).full_name || 'Người dùng'}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Thông tin tài khoản</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Kỹ năng</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Bảo mật</span>
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Edit className="w-5 h-5" />
                    <span>Chỉnh sửa thông tin cá nhân</span>
                  </CardTitle>
                  <CardDescription>
                    Cập nhật thông tin hồ sơ và liên kết mạng xã hội của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName">Họ và tên</Label>
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            fullName: e.target.value
                          }))}
                          placeholder="Nhập họ và tên"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={profileData.email}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Giới thiệu bản thân</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          bio: e.target.value
                        }))}
                        placeholder="Chia sẻ một chút về bản thân bạn..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="location">Địa điểm</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            location: e.target.value
                          }))}
                          placeholder="Thành phố, Quốc gia"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            website: e.target.value
                          }))}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={profileData.github}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            github: e.target.value
                          }))}
                          placeholder="github.com/username"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            linkedin: e.target.value
                          }))}
                          placeholder="linkedin.com/in/username"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-[#0156D2] hover:bg-[#013ba8]"
                    >
                      {loading ? 'Đang cập nhật...' : 'Cập nhật hồ sơ'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Kỹ năng và chứng chỉ</CardTitle>
                  <CardDescription>
                    Quản lý danh sách kỹ năng và chứng chỉ của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Tính năng đang phát triển
                    </h3>
                    <p className="text-gray-600">
                      Quản lý kỹ năng sẽ có sẵn trong phiên bản tiếp theo
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Đổi mật khẩu</span>
                  </CardTitle>
                  <CardDescription>
                    Cập nhật mật khẩu để bảo mật tài khoản của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({
                          ...prev,
                          currentPassword: e.target.value
                        }))}
                        placeholder="Nhập mật khẩu hiện tại"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({
                          ...prev,
                          newPassword: e.target.value
                        }))}
                        placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({
                          ...prev,
                          confirmPassword: e.target.value
                        }))}
                        placeholder="Nhập lại mật khẩu mới"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {loading ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}