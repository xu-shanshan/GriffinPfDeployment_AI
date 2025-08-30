import React, { useMemo } from 'react';
import { makeStyles, tokens, Text, Subtitle1 } from '@fluentui/react-components';
import AppLayout from '../components/layout/AppLayout';
import StatCard, { StatCardData } from '../components/dashboard/StatCard';
import FavoritesSection, { FavoriteItem } from '../components/dashboard/FavoritesSection';

const useStyles = makeStyles({
	gridStats: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
		gap: '16px'
	},
	favoritesWrap: {
		display: 'grid',
		gap: '16px',
		gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))'
	},
	pageSection: {
		display: 'flex',
		flexDirection: 'column',
		gap: '12px'
	}
});

interface DashboardData {
	stats: StatCardData[];
	favoritesVe: FavoriteItem[];
	favoritesServices: FavoriteItem[];
	userName: string;
}

// Placeholder hook (replace with React Query fetching)
const useDashboardData = (): DashboardData => {
	return {
		userName: 'John Doe',
		stats: [
			{
				id: 'totalVEs',
				icon: 'ves',
				value: 18,
				label: 'Total VEs',
				badge: { text: '+2 this month', appearance: 'tint', color: 'success' },
				footerIcon: 'trending'
			},
			{
				id: 'activeServices',
				icon: 'services',
				value: 156,
				label: 'Active Services',
				badge: { text: '98.7% uptime', appearance: 'tint', color: 'success' },
				statusActive: true
			},
			{
				id: 'recentDeployments',
				icon: 'deployments',
				value: 23,
				label: 'Recent Deployments',
				badge: { text: 'Last 24h', appearance: 'tint', color: 'informative' },
				footerIcon: 'clock'
			}
		],
		favoritesVe: [
			{ type: 've', name: 'SovBase', services: 67, veType: 'B Type', updated: '2 hours ago' },
			{ type: 've', name: 'ModelBSov', services: 65, veType: 'B Type', updated: '4 hours ago' },
			{ type: 've', name: 'OwaMailB2-SOV', services: 1, veType: 'B2 Type', updated: '2 minutes ago' }
		],
		favoritesServices: [
			{ type: 'service', name: 'OwaMailB2', instances: 2, status: 'Active', updated: '1 hour ago' },
			{ type: 'service', name: 'Exchange', instances: 2, status: 'Active', updated: '3 hours ago' },
			{ type: 'service', name: 'GraphConnectors', instances: 2, status: 'Not Deployed', updated: '6 hours ago' }
		]
	};
};

export const DashboardPage: React.FC = () => {
	const styles = useStyles();
	const data = useDashboardData();

	const greeting = useMemo(() => {
		const hour = new Date().getHours();
		if (hour < 12) return 'Good morning';
		if (hour < 18) return 'Good afternoon';
		return 'Good evening';
	}, []);

	return (
		<AppLayout
			sidebar={{
				appTitle: 'Griffin Deployment',
				navigation: [
					{ key: 'dashboard', label: 'Dashboard', path: '/dashboard' },
					{ key: 'ves', label: 'Virtual Environments', path: '/ves' },
					{ key: 'services', label: 'Services', path: '/services' },
					{ key: 'deployments', label: 'Deployments', path: '/deployments' }
				],
				favorites: data.favoritesVe.map(f => ({ name: f.name, path: `/ve/${encodeURIComponent(f.name)}` })),
				activeKey: 'dashboard'
			}}
			header={{
				title: 'Dashboard',
				subtitle: 'Virtual Environment Management',
				userName: data.userName
			}}
			pageTitle="Dashboard"
		>
			<section className={styles.pageSection} aria-labelledby="welcome-heading">
				<Subtitle1 id="welcome-heading">
					{greeting}, {data.userName.split(' ')[0]}
				</Subtitle1>
				<Text size={300}>Here is what is happening with your virtual environments today.</Text>
			</section>

			<section aria-labelledby="stats-heading">
				<Text id="stats-heading" as="h2" size={300} weight="semibold" style={{ marginBottom: 8 }}>
					System Statistics
				</Text>
				<div className={styles.gridStats}>
					{data.stats.map(s => (
						<StatCard key={s.id} data={s} onClick={() => { /* navigation placeholder */ }} />
					))}
				</div>
			</section>

			<section aria-labelledby="favorites-heading">
				<Text id="favorites-heading" as="h2" size={300} weight="semibold" style={{ marginBottom: 8 }}>
					Favorites
				</Text>
				<div className={styles.favoritesWrap}>
					<FavoritesSection
						title="Favorite Virtual Environments"
						context="ve"
						items={data.favoritesVe}
						onViewAll={() => { /* navigate to VE list */ }}
						onItemClick={item => { /* open VE detail */ }}
					/>
					<FavoritesSection
						title="Favorite Services"
						context="service"
						items={data.favoritesServices}
						onViewAll={() => { /* navigate to Services list */ }}
						onItemClick={item => { /* open Service detail */ }}
					/>
				</div>
			</section>
		</AppLayout>
	);
};

export default DashboardPage;
