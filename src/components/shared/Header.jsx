import React, { Fragment } from 'react'
import { Menu, Popover } from '@headlessui/react'
import { HiOutlineBell, HiOutlineSearch, HiOutlineChatAlt } from 'react-icons/hi' 
import classNames from 'classnames'
import Avatar from '@mui/material/Avatar';
export default function Header() {
	 
	const firstLetter = localStorage.getItem('username')?.charAt(0) ?? 'G';

	return (
		<div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
			<div className="relative">
				<HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
				<input
					type="text"
					placeholder="Search..."
					className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
				/>
			</div>
			<div className="flex items-center gap-2 mr-2">
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
								)}
							>
								<HiOutlineChatAlt fontSize={24} />
							</Popover.Button>

						</>
					)}
				</Popover>
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
								)}
							>
								<HiOutlineBell fontSize={24} />
							</Popover.Button>

						</>
					)}
				</Popover>
				<Menu as="div" className="relative">
					<div>
						<Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">

							<div className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"  >
								<Avatar sx={{ bgcolor: 'primary.main' }} >
									{firstLetter}
								</Avatar>
							</div>
						</Menu.Button>
					</div>

				</Menu>
			</div>
		</div>
	)
}
