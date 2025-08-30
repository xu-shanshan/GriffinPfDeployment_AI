import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import AppSidebar, { AppSidebarProps } from './AppSidebar';
import AppHeader, { AppHeaderProps } from './AppHeader';

export interface AppLayoutProps {
	sidebar: Omit<AppSidebarProps, 'onNavigate'>;
	header: Omit<AppHeaderProps, 'title'> & { title?: string };
	pageTitle?: string;
	children: React.ReactNode;
	onRoute?: (path: string, key: string) => void;
}

const useStyles = makeStyles({
	root: {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		minHeight: '100dvh',
		backgroundColor: tokens.colorNeutralBackground2
	},
	mainColumn: {
		display: 'flex',
		flexDirection: 'column',
		minWidth: 0,
		overflow: 'hidden'
	},
	pageBody: {
		flexGrow: 1,
		overflowY: 'auto',
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		gap: '16px'
	},
	'@media (max-width: 860px)': {
		root: {
			gridTemplateColumns: '1fr'
		},
		mainColumn: {
			marginLeft: 0
		}
	}
});

/**
 * High-level application layout wrapper
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
	sidebar,
	header,
	pageTitle,
	children,
	onRoute
}) => {
	const styles = useStyles();
	return (
		<div className={styles.root}>
			<AppSidebar
				{...sidebar}
				onNavigate={(path, key) => {
					onRoute?.(path, key);
				}}
			/>
			<div className={styles.mainColumn}>
				<AppHeader
					title={pageTitle || header.title || 'Dashboard'}
					userName={header.userName}
					subtitle={header.subtitle}
					onProfile={header.onProfile}
					onSignOut={header.onSignOut}
					extra={header.extra}
				/>
				<main className={styles.pageBody} role="main">
					{children}
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
