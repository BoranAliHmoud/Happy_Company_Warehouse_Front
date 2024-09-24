import {
	HiOutlineViewGrid,
	HiOutlineCube,
	// HiOutlineShoppingCart,
	HiOutlineUsers,
	// HiOutlineDocumentText,
	// HiOutlineAnnotation,
	// HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	  {
	  	key: 'dashboard',
	  	label: 'Dashboard',
	  	path: '/',
	 	icon: <HiOutlineViewGrid />,
		Authenticated:""
	 },
	{
		key: 'Warehouse',
		label: 'Warehouse',
		path: '/Warehouse',
		icon: <HiOutlineCube />,
		Authenticated:["Admin","Management","Auditor"]
	},
 
	{
		key: 'users',
		label: 'Users',
		path: '/users',
		icon: <HiOutlineUsers />,
		Authenticated:["Admin"]
	},
	 
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />,
		Authenticated:""
	},
	// {
	// 	key: 'support',
	// 	label: 'Help & Support',
	// 	path: '/support',
	// 	icon: <HiOutlineQuestionMarkCircle />
	// }
]
