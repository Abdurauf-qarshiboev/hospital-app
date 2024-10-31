import { api } from "@/helpers/api"

export const spec = {
    state: () => ({
        specs: []
    }),
    getters: {
        specs(state) {
            return state.specs
        },
        activeSpecs(state){
            return state.specs.filter(spec => spec.status == 1)
        }
    },
    mutations: {
        setSpecs(state, list) {
            state.specs = [...list]
        },
        addSpec(state, newData) {
            state.specs = [newData, ...state.specs]
        },
        removeSpec(state, id) {
            state.specs = state.specs.filter(spec => spec._id !== id)
        },
        saveSpec(state, upData) {
            state.specs = state.specs.map(spec => {
                if (spec._id == upData._id) return upData
                return spec
            })
        }
    },
    actions: {
        async allSpecs({ commit }) {
            const { data } = await api.get('spec')

            commit('setSpecs', data)
        },
        async newSpec({ commit }, payload) {
            const { data } = await api.post('spec', payload)
            commit('addSpec', data)
            commit("setNotif", {
              title: "Yangi mutaxassislik qo`shildi!",
            });
        },
        async removeSpec({ commit }, id) {
            await api.delete(`spec/${id}`)
            commit('removeSpec', id)
            commit("setNotif", {
              title: "Mutaxassislik o`chirildi!",
              status: "warning",
            });
        },
        async saveSpec({ commit }, payload) {
            const { data } = await api.put('spec', payload)
            commit('saveSpec', data)
            commit('setNotif', {
                title: 'Mutaxassislik ma`lumotlar yangilandi!',
            })
        },
        async changeStatusSpec({ commit }, payload) {
            const { data } = await api.put('spec', payload)
            commit('saveSpec', data)
            commit("setNotif", {
                title: "Mutaxassislik holati yangilandi!",
            });
        },
        async getSpec(dispatch, id) {
            return await api.get(`spec/${id}`)
        }

    }
}