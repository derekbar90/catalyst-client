import { Models } from '@rematch/core'

import { user } from './user'

const rootModel: RootModel = { user }

export interface RootModel extends Models {
	user: typeof user
}

export default rootModel