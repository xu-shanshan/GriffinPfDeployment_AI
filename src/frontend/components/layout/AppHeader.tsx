import React from 'react';
import {
	makeStyles,
	tokens,
	Button,
	Menu,
	MenuTrigger,
	MenuPopover,
	MenuList,
	MenuItem,
	Avatar,
	Text
} from '@fluentui/react-components';
import { Person24Regular, SignOut24Regular } from '@fluentui/react-icons';

export interface AppHeaderProps {
	title: string;
	subtitle?: string;
	userName: string;
	onSignOut?: () => void;
	onProfile?: () => void;
	className?: string;
	extra?: React.ReactNode;
}

const useStyles = makeStyles({
	root: {
		position: 'sticky',
		top: 0,
		zIndex: 30,
		backgroundColor: tokens.colorNeutralBackground1,
		borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '16px',
		padding: '8px 20px',
		minHeight: '56px'
	},
	group: {
		display: 'flex',
		flexDirection: 'column',
		minWidth: 0
	},
	title: {
		fontSize: tokens.fontSizeBase400,
		fontWeight: 600,
		lineHeight: '1.2',
		margin: 0
	},
	subtitle: {
		color: tokens.colorNeutralForeground3,
		fontSize: tokens.fontSizeBase200,
		margin: 0
	},
	actions: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px'
	},
	userButton: {
		textTransform: 'none'
	}
});

/**
 * Application header with title + user menu
 */
export const AppHeader: React.FC<AppHeaderProps> = ({
	title,
	subtitle,
	userName,
	onSignOut,
	onProfile,
	className,
	extra
}) => {
	const styles = useStyles();
	const initials = userName
		.split(/\s+/)
		.map(s => s[0])
		.slice(0, 2)
		.join('')
		.toUpperCase();

	return (
		<header className={`${styles.root} ${className || ''}`} role="banner">
			<div className={styles.group}>
				<h1 className={styles.title}>{title}</h1>
				{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
			</div>
			<div className={styles.actions}>
				{extra}
				<Menu>
					<MenuTrigger disableButtonEnhancement>
						<Button
							appearance="transparent"
							className={styles.userButton}
							icon={<Avatar name={userName} initials={initials} aria-hidden="true" />}
							aria-label="User menu"
						>
							<Text>{userName}</Text>
						</Button>
					</MenuTrigger>
					<MenuPopover>
						<MenuList>
							<MenuItem icon={<Person24Regular />} onClick={onProfile}>
								Profile
							</MenuItem>
							<MenuItem icon={<SignOut24Regular />} onClick={onSignOut}>
								Sign out
							</MenuItem>
						</MenuList>
					</MenuPopover>
				</Menu>
			</div>
		</header>
	);
};

export default AppHeader;
