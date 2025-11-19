'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/Layout';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

interface CVData {
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
}

export default function CVGeneratorPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [cvData, setCvData] = useState<CVData>({
    personal_info: {
      full_name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadCVTemplate();
  }, [isAuthenticated]);

  const loadCVTemplate = async () => {
    try {
      const response = await api.getCVTemplate();
      if (response.cv_data) {
        setCvData(response.cv_data);
      }
    } catch (error: any) {
      console.error('Error loading CV template:', error);
    }
  };

  const generateCV = async () => {
    setGenerating(true);
    try {
      const response = await api.generateCV(cvData);
      // Handle PDF download
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      console.error('Error generating CV:', error);
    } finally {
      setGenerating(false);
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        school: '',
        year: '',
        gpa: ''
      }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !cvData.skills.includes(skill.trim())) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (index: number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setCvData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: '',
        description: '',
        technologies: [],
        url: ''
      }]
    }));
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (index: number) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Thông tin cá nhân', icon: User },
    { id: 'experience', label: 'Kinh nghiệm', icon: Briefcase },
    { id: 'education', label: 'Học vấn', icon: GraduationCap },
    { id: 'skills', label: 'Kỹ năng', icon: Award },
    { id: 'projects', label: 'Dự án', icon: FileText }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tạo CV Chuyên Nghiệp
          </h1>
          <p className="text-gray-600 text-lg">
            Tạo CV chuyên nghiệp với template được tối ưu hóa cho ngành IT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Các bước tạo CV</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#0156D2] text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
                <div className="pt-4 border-t">
                  <Button
                    onClick={generateCV}
                    disabled={generating}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {generating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Đang tạo...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Tải CV (PDF)
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Info */}
                {activeTab === 'personal' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Họ và tên *</Label>
                        <Input
                          id="fullName"
                          value={cvData.personal_info.full_name}
                          onChange={(e) => updatePersonalInfo('full_name', e.target.value)}
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={cvData.personal_info.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                          id="phone"
                          value={cvData.personal_info.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          placeholder="0123456789"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Địa chỉ</Label>
                        <Input
                          id="address"
                          value={cvData.personal_info.address}
                          onChange={(e) => updatePersonalInfo('address', e.target.value)}
                          placeholder="TP. Hồ Chí Minh"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={cvData.personal_info.linkedin || ''}
                          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                          placeholder="linkedin.com/in/username"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={cvData.personal_info.github || ''}
                          onChange={(e) => updatePersonalInfo('github', e.target.value)}
                          placeholder="github.com/username"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="summary">Tóm tắt nghề nghiệp</Label>
                      <Textarea
                        id="summary"
                        value={cvData.summary}
                        onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Mô tả ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp..."
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Experience */}
                {activeTab === 'experience' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Kinh nghiệm làm việc</h3>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm kinh nghiệm
                      </Button>
                    </div>
                    {cvData.experience.map((exp, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Kinh nghiệm {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Vị trí công việc</Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => updateExperience(index, 'title', e.target.value)}
                              placeholder="Software Developer"
                            />
                          </div>
                          <div>
                            <Label>Công ty</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              placeholder="ABC Company"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Thời gian</Label>
                            <Input
                              value={exp.duration}
                              onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                              placeholder="01/2020 - 12/2022"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Mô tả công việc</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Mô tả chi tiết về công việc, thành tích và trách nhiệm..."
                            rows={3}
                          />
                        </div>
                      </Card>
                    ))}
                    {cvData.experience.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Briefcase className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Chưa có kinh nghiệm nào được thêm</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Education */}
                {activeTab === 'education' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Học vấn</h3>
                      <Button onClick={addEducation} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm học vấn
                      </Button>
                    </div>
                    {cvData.education.map((edu, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Học vấn {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Bằng cấp</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              placeholder="Cử nhân Công nghệ thông tin"
                            />
                          </div>
                          <div>
                            <Label>Trường học</Label>
                            <Input
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                              placeholder="Đại học ABC"
                            />
                          </div>
                          <div>
                            <Label>Năm tốt nghiệp</Label>
                            <Input
                              value={edu.year}
                              onChange={(e) => updateEducation(index, 'year', e.target.value)}
                              placeholder="2022"
                            />
                          </div>
                          <div>
                            <Label>GPA (tùy chọn)</Label>
                            <Input
                              value={edu.gpa || ''}
                              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                              placeholder="3.5/4.0"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                    {cvData.education.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <GraduationCap className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Chưa có học vấn nào được thêm</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Skills */}
                {activeTab === 'skills' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Kỹ năng</h3>
                    <div>
                      <Label htmlFor="newSkill">Thêm kỹ năng</Label>
                      <div className="flex gap-2">
                        <Input
                          id="newSkill"
                          placeholder="JavaScript, React, Node.js..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const target = e.target as HTMLInputElement;
                              addSkill(target.value);
                              target.value = '';
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            const input = document.getElementById('newSkill') as HTMLInputElement;
                            addSkill(input.value);
                            input.value = '';
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(index)}
                            className="ml-1 text-gray-500 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    {cvData.skills.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Award className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Chưa có kỹ năng nào được thêm</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Projects */}
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Dự án</h3>
                      <Button onClick={addProject} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm dự án
                      </Button>
                    </div>
                    {cvData.projects.map((project, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Dự án {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Tên dự án</Label>
                              <Input
                                value={project.name}
                                onChange={(e) => updateProject(index, 'name', e.target.value)}
                                placeholder="E-commerce Website"
                              />
                            </div>
                            <div>
                              <Label>URL (tùy chọn)</Label>
                              <Input
                                value={project.url || ''}
                                onChange={(e) => updateProject(index, 'url', e.target.value)}
                                placeholder="https://project-demo.com"
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Mô tả dự án</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => updateProject(index, 'description', e.target.value)}
                              placeholder="Mô tả chi tiết về dự án, vai trò và thành tích..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>Công nghệ sử dụng</Label>
                            <Input
                              placeholder="React, Node.js, MongoDB (phân cách bằng dấu phẩy)"
                              onChange={(e) => {
                                const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                                updateProject(index, 'technologies', technologies);
                              }}
                            />
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {cvData.projects.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Chưa có dự án nào được thêm</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}