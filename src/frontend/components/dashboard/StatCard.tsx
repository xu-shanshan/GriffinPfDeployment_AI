import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, makeStyles, tokens, Text, Badge } from '@fluentui/react-components';
import {
	Database24Regular,
	Layers24Regular,
	CloudArrowUp24Regular,
	Clock24Regular,
	ArrowTrending24Regular
} from '@fluentui/react-icons';

export type StatIconName = 'ves' | 'services' | 'deployments';
export type FooterIconName = 'trending' | 'clock';

export interface StatBadge {
	text: string;
	appearance: 'filled' | 'tint' | 'outline';
	color?: 'brand' | 'success' | 'important' | 'informative' | 'warning' | 'danger' | 'severe' | 'subtle';
}

export interface StatCardData {
	id: string;
	icon: StatIconName;
	value: number;
	label: string;
	badge: StatBadge;
	statusActive?: boolean;
	footerIcon?: FooterIconName;
	onNavigate?: string;
}

export interface StatCardProps {
	data: StatCardData;
	onClick?: (id: string) => void;
	animate?: boolean;
}

const useStyles = makeStyles({
	card: {
		cursor: 'pointer',
		maxWidth: '360px',
		minWidth: '200px',
		transition: 'background .15s',
		':hover': {
			backgroundColor: tokens.colorNeutralBackground1Hover
		}
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		gap: '12px'
	},
	kpiWrap: {
		display: 'flex',
		alignItems: 'baseline',
		gap: '4px'
	},
	value: {
		fontSize: '2rem',
		fontWeight: 600,
		lineHeight: 1
	},
	label: {
		color: tokens.colorNeutralForeground3
	},
	footer: {
		marginTop: '8px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	activeDot: {
		width: '10px',
		height: '10px',
		borderRadius: '50%',
		backgroundColor: tokens.colorStatusSuccessBackground3
	}
});

const iconMap: Record<StatIconName, React.ReactNode> = {
	ves: <Database24Regular />,
	services: <Layers24Regular />,
	deployments: <CloudArrowUp24Regular />
};

const footerIconMap: Record<FooterIconName, React.ReactNode> = {
	trending: <ArrowTrending24Regular />,
	clock: <Clock24Regular />
};

export const StatCard: React.FC<StatCardProps> = ({ data, onClick, animate = true }) => {
	const styles = useStyles();
	const [displayValue, setDisplayValue] = useState<number>(animate ? 0 : data.value);
	const started = useRef(false);

	useEffect(() => {
		if (!animate || started.current) return;
		started.current = true;
		const startTs = performance.now();
		const duration = 700;
		const loop = (now: number) => {
			const p = Math.min((now - startTs) / duration, 1);
			setDisplayValue(Math.round(data.value * p));
			if (p < 1) requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	}, [data.value, animate]);

	return (
		<Card
			className={styles.card}
			role="button"
			tabIndex={0}
			aria-label={`${data.label} ${data.value}`}
			onClick={() => onClick?.(data.id)}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick?.(data.id);
				}
			}}
		>
			<CardHeader
				header={
					<div className={styles.header}>
						<div aria-hidden="true">{iconMap[data.icon]}</div>
						<div>
							<div className={styles.kpiWrap}>
								<span className={styles.value}>{displayValue}</span>
							</div>
							<Text size={300} className={styles.label}>
								{data.label}
							</Text>
						</div>
					</div>
				}
			/>
			<div className={styles.footer}>
				<Badge appearance={data.badge.appearance} color={data.badge.color || 'brand'}>
					{data.badge.text}
				</Badge>
				{data.statusActive && <span className={styles.activeDot} aria-label="Active status" />}
				{!data.statusActive && data.footerIcon && (
					<span aria-hidden="true">{footerIconMap[data.footerIcon]}</span>
				)}
			</div>
		</Card>
	);
};

export default StatCard;
