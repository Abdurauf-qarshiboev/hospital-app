import { api } from "@/helpers/api"

export const room = {
    state: () => ({
        rooms: []
    }),
    getters: {
        rooms(state) {
            return state.rooms
        },
        activeRoom(state) {
            return state.rooms.filter(room => room.status == 1)
        }
    },
    mutations: {
        setRooms(state, list) {
            state.rooms = [...list]
        },
        addRoom(state, newData) {
            state.rooms = [newData, ...state.rooms]
        },
        removeRoom(state, id) {
            state.rooms = state.rooms.filter(room => room._id !== id)
        },
        saveRoom(state, upData) {
            state.rooms = state.rooms.map(room => {
                if (room._id == upData._id) return upData
                return room
            })
        }
    },
    actions: {
        async allRooms({ commit }) {
            const { data } = await api.get('room')

            commit('setRooms', data)
        },
        async newRoom({ commit }, payload) {
            const { data } = await api.post('room', payload)
            commit('addRoom', data)
            commit('setNotif', {
                title: 'Yangi bo`lim qo`shildi'
            })
        },
        async removeRoom({ commit }, id) {
            await api.delete(`room/${id}`)
            commit('removeRoom', id)
            commit('setNotif', {
                title: 'Xona o`chirildi',
                status: 'warning'
            })
        },
        async saveRoom({ commit }, payload) {
            const { data } = await api.put('room', payload)
            commit('saveRoom', data)
            commit('setNotif', {
                title: 'Xona ma`lumotlar yangilandi',
            })
        },
        async changeStatusRoom({ commit }, payload) {
            const { data } = await api.put('room', payload)
            commit('saveRoom', data)
            commit('setNotif', {
                title: 'Xona holati yangilandi',
            })
        },
        async getRoom(dispatch, id) {
            return await api.get(`room/${id}`)
        }

    }
}