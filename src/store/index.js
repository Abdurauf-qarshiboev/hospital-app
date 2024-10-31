import { createStore } from 'vuex'

import { notification } from './data/notification'
import { department } from './data/department'
import { auth } from './data/auth'
import { modal } from './data/modal'
import { spec } from './data/spec'
import { room } from './data/room'
import { doctor } from './data/doctor'

export const store = createStore({
    modules: {
        doctor,
        spec,
        room,
        notification,
        department,
        auth,
        modal
    }
})


