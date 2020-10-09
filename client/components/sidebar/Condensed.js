import React, { useState } from 'react';
import { Sidebar } from '@rocket.chat/fuselage';
import { useMutableCallback } from '@rocket.chat/fuselage-hooks';

const Condensed = React.memo(({
	icon,
	title = '',
	avatar,
	actions,
	href,
	menuOptions,
	unread,
	menu,
	badges,
	...props
}) => {
	const [menuVisibility, setMenuVisibility] = useState(!!window.DISABLE_ANIMATION);

	const handleMenu = useMutableCallback((e) => {
		setMenuVisibility(e.target.offsetWidth > 0 && Boolean(menu));
	});
	return <Sidebar.Item {...props} href={href} clickable={!!href}>
		{avatar && <Sidebar.Item.Avatar>
			{ avatar }
		</Sidebar.Item.Avatar>}
		<Sidebar.Item.Content>
			{ icon }
			<Sidebar.Item.Title data-qa='sidebar-item-title' className={unread && 'rcx-sidebar-item--highlighted'}>{title}</Sidebar.Item.Title> {badges}
		</Sidebar.Item.Content>
		<Sidebar.Item.Container>
			{<Sidebar.Item.Actions>
				{ actions }
			</Sidebar.Item.Actions>}
		</Sidebar.Item.Container>
		<Sidebar.Item.Menu onTransitionEnd={handleMenu}>{menuVisibility && menu()}</Sidebar.Item.Menu>
	</Sidebar.Item>;
});

export default Condensed;
