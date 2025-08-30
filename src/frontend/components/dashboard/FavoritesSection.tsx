import React from 'react';
import { Card, CardHeader, Button, makeStyles, tokens, Text, Badge } from '@fluentui/react-components';
import {
	Star24Regular,
	Heart24Regular,
	ChevronRight20Regular
} from '@fluentui/react-icons';

export interface FavoriteVE {
	type: 've';
	name: string;
	services: number;
	veType: string;
	veTypeAppearance?: 'subtle' | 'filled' | 'tint';
	updated: string;
}

export interface FavoriteService {
	type: 'service';
	name: string;
	instances: number;
	status: string;
	statusColor?: 'success' | 'informative' | 'warning' | 'danger' | 'brand' | 'severe' | 'important' | 'subtle';
	updated: string;
}

export type FavoriteItem = FavoriteVE | FavoriteService;

export interface FavoritesSectionProps {
	title: string;
	context: 've' | 'service';
	items: FavoriteItem[];
	onViewAll?: () => void;
	onItemClick?: (item: FavoriteItem) => void;
}

const useStyles = makeStyles({
	card: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: '12px'
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
		gap: '4px',
		margin: 0,
		padding: 0,
		listStyle: 'none'
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '8px 10px',
		borderRadius: tokens.borderRadiusMedium,
		cursor: 'pointer',
		':hover': {
			backgroundColor: tokens.colorNeutralBackground1Hover
		}
	},
	itemMeta: {
		display: 'flex',
		flexDirection: 'column',
		gap: '2px'
	},
	name: { fontWeight: 600 },
	subline: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
	time: { color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase100 }
});

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
	title,
	context,
	items,
	onViewAll,
	onItemClick
}) => {
	const styles = useStyles();

	return (
		<Card className={styles.card} size="small">
			<CardHeader
				header={<Text weight="semibold">{title}</Text>}
				actions={
					<Button size="small" appearance="subtle" onClick={onViewAll}>
						View All
					</Button>
				}
				image={context === 've' ? <Star24Regular aria-hidden="true" /> : <Heart24Regular aria-hidden="true" />}
			/>
			<ul className={styles.list} role="list">
				{items.map(i => (
					<li
						key={i.name}
						className={styles.item}
						role="button"
						tabIndex={0}
						aria-label={`${i.name} updated ${i.updated}`}
						onClick={() => onItemClick?.(i)}
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								onItemClick?.(i);
							}
						}}
					>
						<div className={styles.itemMeta}>
							<span className={styles.name}>{i.name}</span>
							<div className={styles.subline}>
								{i.type === 've' && (
									<>
										<Text size={200}>{i.services} services</Text>
										<Badge appearance={i.veTypeAppearance || 'filled'}>{i.veType}</Badge>
									</>
								)}
								{i.type === 'service' && (
									<>
										<Text size={200}>{i.instances} VE instances</Text>
										<Badge appearance="tint" color={i.statusColor || 'informative'}>
											{i.status}
										</Badge>
									</>
								)}
							</div>
							<span className={styles.time}>{i.updated}</span>
						</div>
						<ChevronRight20Regular aria-hidden="true" />
					</li>
				))}
			</ul>
		</Card>
	);
};

export default FavoritesSection;
