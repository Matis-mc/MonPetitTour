import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://mpt-z3u7.onrender.com/api';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref(localStorage.getItem('access_token'))
    const refreshToken = ref(localStorage.getItem('refresh_token'))
    const user = ref(null)

    const isAuthenticated = computed(() => !!accessToken.value)

    function setTokens(access: string, refresh: string, user: any) {
        accessToken.value = access
        refreshToken.value = refresh
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        localStorage.setItem('mpt_user', JSON.stringify(user))
    }

    function clearTokens() {
        accessToken.value = null
        refreshToken.value = null
        user.value = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('mpt_user')
    }

    async function login() {
        const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID
        const redirectUri = `${window.location.origin}/auth/callback`
        const scope = 'read,activity:read_all'

        const stravaUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&approval_prompt=auto`

        window.location.href = stravaUrl
    }

    async function handleCallback(code: string) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/strava`, { code })
            const { access_token, refresh_token, athlete } = response.data
            setTokens(access_token, refresh_token, athlete)
            user.value = athlete
            return true
        } catch (error) {
            console.error('Failed to handle Strava callback', error)
            clearTokens()
            return false
        }
    }

    async function refreshAccessToken() {
        if (!refreshToken.value) {
            clearTokens()
            return null
        }

        try {
            const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                refresh_token: refreshToken.value
            })
            const { access_token, refresh_token, athlete } = response.data
            setTokens(access_token, refresh_token, athlete)
            user.value = athlete
            return access_token
        } catch (error) {
            console.error('Failed to refresh token', error)
            clearTokens()
            return null
        }
    }

    function logout() {
        clearTokens()
        window.location.href = '/'
    }

    function getUser() {
        const user = localStorage.getItem('mpt_user')
        if (user) {
            return JSON.parse(user)
        }
    }

    return {
        accessToken,
        refreshToken,
        user,
        isAuthenticated,
        setTokens,
        clearTokens,
        login,
        handleCallback,
        refreshAccessToken,
        logout,
        getUser
    }
})
