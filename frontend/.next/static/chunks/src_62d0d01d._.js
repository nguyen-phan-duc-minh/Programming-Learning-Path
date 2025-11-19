(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
;
;
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5001/api") || 'http://localhost:5001/api';
class ApiClient {
    // Auth endpoints
    async login(email, password) {
        const response = await this.client.post('/auth/login', {
            email,
            password
        });
        return response.data;
    }
    async register(userData) {
        const response = await this.client.post('/auth/register', userData);
        return response.data;
    }
    async getCurrentUser() {
        const response = await this.client.get('/auth/me');
        return response.data;
    }
    async forgotPassword(email) {
        const response = await this.client.post('/auth/forgot-password', {
            email
        });
        return response.data;
    }
    async updateProfile(profileData) {
        const response = await this.client.put('/auth/profile', profileData);
        return response.data;
    }
    async changePassword(currentPassword, newPassword) {
        const response = await this.client.put('/auth/change-password', {
            current_password: currentPassword,
            new_password: newPassword
        });
        return response.data;
    }
    logout() {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove('access_token');
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove('refresh_token');
        if ("TURBOPACK compile-time truthy", 1) {
            window.location.href = '/auth/login';
        }
    }
    // Assessment endpoints
    async getAssessment() {
        const response = await this.client.get('/assessment');
        return response.data;
    }
    async submitAssessment(assessmentData) {
        const response = await this.client.post('/assessment/submit', assessmentData);
        return response.data;
    }
    async getQuizQuestions(category) {
        const response = await this.client.get("/assessment/quiz/".concat(category));
        return response.data;
    }
    async submitQuiz(quizData) {
        const response = await this.client.post('/assessment/quiz/submit', quizData);
        return response.data;
    }
    // Roadmap endpoints
    async getRoadmap() {
        const response = await this.client.get('/roadmap');
        return response.data;
    }
    async generateRoadmap(preferences) {
        const response = await this.client.post('/roadmap/generate', preferences);
        return response.data;
    }
    async updateTaskProgress(taskId, progress) {
        const response = await this.client.put("/roadmap/task/".concat(taskId, "/progress"), {
            progress
        });
        return response.data;
    }
    // Resources endpoints
    async getResources(category, level) {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (level) params.append('level', level);
        const response = await this.client.get("/resources?".concat(params.toString()));
        return response.data;
    }
    // AI Chat endpoints
    async getChatHistory() {
        const response = await this.client.get('/ai/chat/history');
        return response.data;
    }
    async sendMessage(message) {
        const response = await this.client.post('/ai/chat', {
            message
        });
        return response.data;
    }
    // CV endpoints
    async generateCV(cvData) {
        const response = await this.client.post('/cv/generate', cvData);
        return response.data;
    }
    async getCVTemplate() {
        const response = await this.client.get('/cv/template');
        return response.data;
    }
    // Admin endpoints
    async getDashboardStats() {
        const response = await this.client.get('/admin/dashboard/stats');
        return response.data;
    }
    async getUsers() {
        const response = await this.client.get('/admin/users');
        return response.data;
    }
    async createUser(userData) {
        const response = await this.client.post('/admin/users', userData);
        return response.data;
    }
    async updateUser(userId, userData) {
        const response = await this.client.put("/admin/users/".concat(userId), userData);
        return response.data;
    }
    async deleteUser(userId) {
        const response = await this.client.delete("/admin/users/".concat(userId));
        return response.data;
    }
    async getQuestions() {
        const response = await this.client.get('/admin/questions');
        return response.data;
    }
    async createQuestion(questionData) {
        const response = await this.client.post('/admin/questions', questionData);
        return response.data;
    }
    async updateQuestion(questionId, questionData) {
        const response = await this.client.put("/admin/questions/".concat(questionId), questionData);
        return response.data;
    }
    async deleteQuestion(questionId) {
        const response = await this.client.delete("/admin/questions/".concat(questionId));
        return response.data;
    }
    async getResourcesAdmin() {
        const response = await this.client.get('/admin/resources');
        return response.data;
    }
    async createResource(resourceData) {
        const response = await this.client.post('/admin/resources', resourceData);
        return response.data;
    }
    async updateResource(resourceId, resourceData) {
        const response = await this.client.put("/admin/resources/".concat(resourceId), resourceData);
        return response.data;
    }
    async deleteResource(resourceId) {
        const response = await this.client.delete("/admin/resources/".concat(resourceId));
        return response.data;
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "client", void 0);
        this.client = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Request interceptor to add auth token
        this.client.interceptors.request.use((config)=>{
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('access_token');
            if (token) {
                config.headers.Authorization = "Bearer ".concat(token);
            }
            return config;
        }, (error)=>{
            return Promise.reject(error);
        });
        // Response interceptor to handle token refresh
        this.client.interceptors.response.use((response)=>response, async (error)=>{
            var _error_response;
            const originalRequest = error.config;
            if (((_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status) === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('refresh_token');
                    if (refreshToken) {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(API_BASE_URL, "/auth/refresh"), {}, {
                            headers: {
                                'Authorization': "Bearer ".concat(refreshToken)
                            }
                        });
                        const { access_token } = response.data;
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set('access_token', access_token, {
                            expires: 1
                        }); // 1 day
                        // Retry original request with new token
                        originalRequest.headers.Authorization = "Bearer ".concat(access_token);
                        return this.client(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh failed, redirect to login
                    this.logout();
                    if ("TURBOPACK compile-time truthy", 1) {
                        window.location.href = '/auth/login';
                    }
                }
            }
            return Promise.reject(error);
        });
    }
}
const api = new ApiClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider(param) {
    let { children } = param;
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const isAuthenticated = !!user;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const initializeAuth = {
                "AuthProvider.useEffect.initializeAuth": async ()=>{
                    try {
                        const accessToken = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('access_token');
                        if (accessToken) {
                            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getCurrentUser();
                            setUser(userData);
                        }
                    } catch (error) {
                        console.error('Failed to initialize auth:', error);
                        // Clear invalid tokens
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove('access_token');
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove('refresh_token');
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["AuthProvider.useEffect.initializeAuth"];
            initializeAuth();
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].login(email, password);
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };
    const register = async (userData)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].register(userData);
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };
    const logout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].logout();
        setUser(null);
    };
    const updateUser = (userData)=>{
        if (user) {
            setUser({
                ...user,
                ...userData
            });
        }
    };
    const value = {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 96,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "YajQB7LURzRD+QP5gw0+K2TZIWA=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_62d0d01d._.js.map