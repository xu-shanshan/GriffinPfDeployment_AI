class DashboardManager {
    constructor() {
        this.init();
    }

    init() {
        this.initFeatherIcons();
        this.bindEvents();
        this.loadDashboardData();
    }

    initFeatherIcons() {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    bindEvents() {
        // Navigation event delegation
        document.addEventListener('click', (e) => {
            const navigateElement = e.target.closest('[data-navigate]');
            if (navigateElement) {
                this.handleNavigation(navigateElement.dataset.navigate);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement.dataset.navigate) {
                    e.preventDefault();
                    this.handleNavigation(focusedElement.dataset.navigate);
                }
            }
        });
    }

    handleNavigation(url) {
        if (url) {
            window.location.href = url;
        }
    }

    async loadDashboardData() {
        try {
            // Simulate API calls for real-time data
            const [veStats, serviceStats, deploymentStats] = await Promise.all([
                this.fetchVEStats(),
                this.fetchServiceStats(),
                this.fetchDeploymentStats()
            ]);

            this.updateStats(veStats, serviceStats, deploymentStats);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    async fetchVEStats() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    total: 18,
                    change: '+2 this month',
                    trend: 'up'
                });
            }, 500);
        });
    }

    async fetchServiceStats() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    active: 156,
                    uptime: '98.7%'
                });
            }, 600);
        });
    }

    async fetchDeploymentStats() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    recent: 23,
                    timeframe: 'Last 24 hours'
                });
            }, 400);
        });
    }

    updateStats(veStats, serviceStats, deploymentStats) {
        // Update VE stats
        const veCard = document.querySelector('[data-navigate="ve-management.html"]');
        if (veCard) {
            const numberElement = veCard.querySelector('.stat-number');
            if (numberElement) {
                this.animateNumber(numberElement, veStats.total);
            }
        }

        // Update service stats
        const serviceCard = document.querySelector('[data-navigate="services-management.html"]');
        if (serviceCard) {
            const numberElement = serviceCard.querySelector('.stat-number');
            if (numberElement) {
                this.animateNumber(numberElement, serviceStats.active);
            }
        }

        // Update deployment stats
        const deploymentCard = document.querySelector('[data-navigate="deployment-history.html"]');
        if (deploymentCard) {
            const numberElement = deploymentCard.querySelector('.stat-number');
            if (numberElement) {
                this.animateNumber(numberElement, deploymentStats.recent);
            }
        }
    }

    animateNumber(element, targetValue) {
        const startValue = 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.round(startValue + (targetValue - startValue) * progress);
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    showError(message) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #d13438;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});
