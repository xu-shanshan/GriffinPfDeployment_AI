import React, { useState, useCallback } from 'react';
import { makeStyles, shorthands, tokens, Button, Tooltip, Text, Divider, Badge } from '@fluentui/react-components';
import { NavLink } from 'react-router-dom';
import {
	Home24Regular,
	Grid24Regular,
	Database24Regular,
	Folder24Regular,
	Heart24Regular,
	Star24Regular,
	Settings24Regular,
	ArrowCollapseAll24Regular,
	ArrowExpand24Regular
} from '@fluentui/react-icons';

export interface NavItem {
	key: string;
	label: string;
	path: string;
	icon?: React.ReactNode;
	badgeCount?: number;
}

export interface FavoriteItem {
	name: string;
	path: string;
}

export interface AppSidebarProps {
	appTitle?: string;
	navigation: NavItem[];
	favorites?: FavoriteItem[];
	activeKey?: string;
	onNavigate?: (path: string, key: string) => void;
	onSettingsClick?: () => void;
	className?: string;
}

const useStyles = makeStyles({
	root: {
		position: 'sticky',
		top: 0,
		height: '100dvh',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: tokens.colorNeutralBackground2,
		minWidth: '240px',
		maxWidth: '260px',
		transition: 'width .2s',
		borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
		'@media (max-width: 860px)': {
			position: 'fixed',
			zIndex: 40
		}
	},
	collapsed: {
		width: '64px',
		minWidth: '64px',
		maxWidth: '64px'
	},
	header: {
		...shorthands.padding('12px', '16px', '8px'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '4px'
	},
	title: {
		fontWeight: 600,
		fontSize: tokens.fontSizeBase300,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	},
	nav: {
		flexGrow: 1,
		overflowY: 'auto',
		...shorthands.padding(0, '4px')
	},
	sectionLabel: {
		...shorthands.padding('12px', '12px', '4px'),
		fontSize: tokens.fontSizeBase200,
		fontWeight: 500,
		color: tokens.colorNeutralForeground3
	},
	list: {
		listStyle: 'none',
		margin: 0,
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		gap: '2px'
	},
	itemLink: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		textDecoration: 'none',
		color: tokens.colorNeutralForeground2,
		borderRadius: tokens.borderRadiusMedium,
		...shorthands.padding('8px', '12px'),
		fontSize: tokens.fontSizeBase200,
		fontWeight: 500,
		outlineStyle: 'none',
		':hover': {
			backgroundColor: tokens.colorNeutralBackground1Hover,
			color: tokens.colorNeutralForeground1
		},
		':focus-visible': {
			boxShadow: `0 0 0 2px ${tokens.colorStrokeFocus2}`
		},
		'&[data-active=true]': {
			backgroundColor: tokens.colorNeutralBackground1Selected,
			color: tokens.colorNeutralForeground1,
			'::before': {
				content: '""',
				position: 'absolute',
				left: 0,
				top: 4,
				bottom: 4,
				width: '3px',
				borderRadius: '2px',
				backgroundColor: tokens.colorCompoundBrandBackground
			}
		}
	},
	iconOnly: {
		justifyContent: 'center'
	},
	badge: {
		marginLeft: 'auto'
	},
	footer: {
		...shorthands.padding('8px'),
		borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
		display: 'flex',
		gap: '4px'
	},
	hideWhenCollapsed: {
		'.collapsed &': {
			display: 'none'
		}
	},
	rootCollapseContext: {
		'.collapsed &': {
			'& $title': { display: 'none' }
		}
	}
});

/**
 * Application sidebar with navigation + favorites
 */
export const AppSidebar: React.FC<AppSidebarProps> = ({
	appTitle = 'Griffin Deployment',
	navigation,
	favorites = [],
	activeKey,
	onNavigate,
	onSettingsClick
}) => {
	const styles = useStyles();
	const [collapsed, setCollapsed] = useState(false);

	const handleNav = useCallback(
		(path: string, key: string) => {
			onNavigate?.(path, key);
		},
		[onNavigate]
	);

	const renderLabel = (label: string) =>
		collapsed ? <></> : <span>{label}</span>;

	return (
		<aside
			className={`${styles.root} ${collapsed ? styles.collapsed + ' collapsed' : ''}`}
			aria-label="Application sidebar"
		>
			<div className={styles.header}>
				<Text as="div" className={styles.title} title={appTitle} role="heading" aria-level={1}>
					{!collapsed && appTitle}
				</Text>
				<Tooltip content={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} relationship="label">
					<Button
						appearance="subtle"
						icon={collapsed ? <ArrowExpand24Regular /> : <ArrowCollapseAll24Regular />}
						onClick={() => setCollapsed(c => !c)}
						aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
					/>
				</Tooltip>
			</div>
			<nav className={styles.nav} aria-label="Main">
				<ul className={styles.list} role="list">
					{navigation.map(item => {
						const Icon =
							item.icon ??
							(item.key === 'dashboard'
								? <Home24Regular />
								: item.key === 'ves'
								? <Database24Regular />
								: item.key === 'services'
								? <Grid24Regular />
								: <Folder24Regular />);
						return (
							<li key={item.key}>
								<Tooltip content={item.label} relationship="label" disabled={!collapsed}>
									<NavLink
										to={item.path}
										onClick={() => handleNav(item.path, item.key)}
										className={({ isActive }) =>
											[
												styles.itemLink,
												collapsed ? styles.iconOnly : '',
												isActive || activeKey === item.key ? '' : ''
											].join(' ')
										}
										data-active={activeKey === item.key}
										aria-current={activeKey === item.key ? 'page' : undefined}
									>
										{Icon}
										{renderLabel(item.label)}
										{item.badgeCount !== undefined && !collapsed && (
											<Badge appearance="filled" color="brand" className={styles.badge}>
												{item.badgeCount}
											</Badge>
										)}
									</NavLink>
								</Tooltip>
							</li>
						);
					})}
				</ul>
				{favorites.length > 0 && (
					<>
						<Divider />
						<div className={styles.sectionLabel}>
							{collapsed ? <Star24Regular /> : 'Favorites'}
						</div>
						<ul className={styles.list} role="list">
							{favorites.map(f => (
								<li key={f.name}>
									<Tooltip content={f.name} relationship="label" disabled={!collapsed}>
										<NavLink
											to={f.path}
											className={`${styles.itemLink} ${collapsed ? styles.iconOnly : ''}`}
											onClick={() => handleNav(f.path, f.name)}
										>
											<Heart24Regular />
											{renderLabel(f.name)}
										</NavLink>
									</Tooltip>
								</li>
							))}
						</ul>
					</>
				)}
			</nav>
			<div className={styles.footer}>
				<Tooltip content="Settings" relationship="label">
					<Button
						appearance="subtle"
						icon={<Settings24Regular />}
						aria-label="Settings"
						onClick={onSettingsClick}
					/>
				</Tooltip>
			</div>
		</aside>
	);
};

export default AppSidebar;
