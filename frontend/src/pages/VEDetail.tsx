import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Title1, 
  Title2,
  Body1, 
  Card,
  Badge,
  Button,
  Field,
  Input,
  Switch,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableBody,
  ProgressBar,
  Checkbox
} from '@fluentui/react-components'
import { 
  Star20Filled,
  Star20Regular,
  ArrowClockwise20Regular,
  Edit20Regular,
  Search20Regular,
  Play20Regular,
  CheckmarkCircle20Filled,
  DismissCircle20Filled,
  Warning20Filled,
  Server20Regular,
  Mail20Regular,
  Flash20Regular,
  Heart20Regular
} from '@fluentui/react-icons'

interface Service {
  id: string
  name: string
  description: string
  status: 'ready' | 'not-deployed' | 'missing-pfgold' | 'config-error'
  inDragon: boolean
  inPFGold: boolean
  currentVersion: string | null
  pipeline: string | null
  pipelineVersion: string | null
  icon: string
  iconColor: string
  readyToDeploy: boolean
}

const VEDetail: React.FC = () => {
  const { veName } = useParams<{ veName: string }>()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [configFilter, setConfigFilter] = useState('')
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set())
  const [showBulkModal, setShowBulkModal] = useState(false)

  const [services] = useState<Service[]>([
    {
      id: 'owamailb2',
      name: 'OwaMailB2',
      description: 'Outlook Web App Mail Backend',
      status: 'ready',
      inDragon: true,
      inPFGold: true,
      currentVersion: 'v2.1.234',
      pipeline: 'ExchangeMailPipeline',
      pipelineVersion: 'v3.2.1',
      icon: 'mail',
      iconColor: 'blue',
      readyToDeploy: true
    },
    {
      id: 'graphconnectors',
      name: 'GraphConnectors',
      description: 'Graph Connectors Service',
      status: 'not-deployed',
      inDragon: true,
      inPFGold: true,
      currentVersion: null,
      pipeline: 'GraphConnectorsPipeline',
      pipelineVersion: 'v2.8.5',
      icon: 'flash',
      iconColor: 'orange',
      readyToDeploy: false
    },
    {
      id: 'flowcontrol',
      name: 'FlowControl',
      description: 'Flow Control Service',
      status: 'missing-pfgold',
      inDragon: true,
      inPFGold: false,
      currentVersion: null,
      pipeline: 'FlowControlPipeline',
      pipelineVersion: 'v1.9.3',
      icon: 'activity',
      iconColor: 'yellow',
      readyToDeploy: false
    },
    {
      id: 'invalidservice',
      name: 'InvalidService',
      description: 'Service not in Dragon map',
      status: 'config-error',
      inDragon: false,
      inPFGold: true,
      currentVersion: 'v1.0.0',
      pipeline: null,
      pipelineVersion: null,
      icon: 'alert',
      iconColor: 'red',
      readyToDeploy: false
    }
  ])

  const filteredServices = services.filter(service => {
    const matchesSearch = !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = !statusFilter || service.status === statusFilter
    
    let matchesConfig = true
    if (configFilter === 'both') {
      matchesConfig = service.inDragon && service.inPFGold
    } else if (configFilter === 'dragon-only') {
      matchesConfig = service.inDragon && !service.inPFGold
    } else if (configFilter === 'pfgold-only') {
      matchesConfig = !service.inDragon && service.inPFGold
    }
    
    return matchesSearch && matchesStatus && matchesConfig
  })

  const handleServiceClick = (serviceName: string) => {
    // Ensure the route matches your App.tsx routing structure
    navigate(`/ve/${veName}/service/${serviceName}`)
  }

  const getStatusBadge = (status: string, readyToDeploy = false) => {
    switch (status) {
      case 'ready':
        return <Badge appearance="filled" color="success">Ready to Deploy</Badge>
      case 'not-deployed':
        return readyToDeploy 
          ? <Badge appearance="filled" color="brand">Prepared for Deployment</Badge>
          : <Badge appearance="outline">Not Deployed</Badge>
      case 'missing-pfgold':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge appearance="filled" color="warning">Missing in PFGold</Badge>
            <Warning20Filled style={{ color: '#f7b500' }} />
          </div>
        )
      case 'config-error':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge appearance="filled" color="danger">Configuration Error</Badge>
            <DismissCircle20Filled style={{ color: '#d13438' }} />
          </div>
        )
      default:
        return <Badge appearance="outline">Unknown</Badge>
    }
  }

  const getServiceIcon = (iconName: string, iconColor: string) => {
    const iconMap = {
      mail: <Mail20Regular style={{ color: iconColor === 'blue' ? '#0f6cbd' : iconColor }} />,
      flash: <Flash20Regular style={{ color: iconColor === 'orange' ? '#f7630c' : iconColor }} />,
      activity: <Heart20Regular style={{ color: iconColor === 'yellow' ? '#f7b500' : iconColor }} />,
      alert: <Warning20Filled style={{ color: iconColor === 'red' ? '#d13438' : iconColor }} />,
    }
    return iconMap[iconName as keyof typeof iconMap] || <Server20Regular />
  }

  const handleSelectAll = () => {
    const selectableServices = filteredServices.filter(s => 
      s.status === 'ready' || (s.status === 'not-deployed' && s.readyToDeploy)
    )
    
    if (selectedServices.size === selectableServices.length) {
      setSelectedServices(new Set())
    } else {
      setSelectedServices(new Set(selectableServices.map(s => s.id)))
    }
  }

  const handleServiceSelection = (serviceId: string) => {
    const newSelected = new Set(selectedServices)
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId)
    } else {
      newSelected.add(serviceId)
    }
    setSelectedServices(newSelected)
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* VE Header */}
      <Card style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0f6cbd 0%, #115ea3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Server20Regular style={{ color: 'white', width: '32px', height: '32px' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <Title1>{veName}</Title1>
                <Button
                  appearance="subtle"
                  icon={isFavorite ? <Star20Filled /> : <Star20Regular />}
                  onClick={() => setIsFavorite(!isFavorite)}
                  style={{ color: isFavorite ? '#faa06b' : undefined }}
                />
              </div>
              <Body1 style={{ marginBottom: '12px' }}>Base sovereign virtual environment for core services</Body1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Badge appearance="filled" color="brand">B Type VE</Badge>
                <Body1 style={{ fontSize: '12px', color: '#616161' }}>Last updated: 2 hours ago</Body1>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button 
              appearance="secondary"
              icon={<ArrowClockwise20Regular />}
              onClick={() => console.log('Refresh')}
            >
              Refresh
            </Button>
            <Button 
              appearance="primary"
              icon={<Edit20Regular />}
            >
              Edit Config
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <Card style={{ padding: '24px', textAlign: 'center', cursor: 'pointer', border: '1px solid #e0e0e0' }}>
            <Title2 style={{ color: '#0f6cbd', marginBottom: '8px' }}>89</Title2>
            <Body1 style={{ fontSize: '14px' }}>Dragon GriffinServiceMap.ini</Body1>
          </Card>
          <Card style={{ padding: '24px', textAlign: 'center', cursor: 'pointer', border: '1px solid #e0e0e0' }}>
            <Title2 style={{ marginBottom: '8px' }}>67</Title2>
            <Body1 style={{ fontSize: '14px' }}>PFGold deployment.ini</Body1>
          </Card>
          <Card style={{ padding: '24px', textAlign: 'center', cursor: 'pointer', border: '1px solid #e0e0e0' }}>
            <Title2 style={{ color: '#107c10', marginBottom: '8px' }}>62</Title2>
            <Body1 style={{ fontSize: '14px' }}>Deployed</Body1>
          </Card>
        </div>
      </Card>

      {/* Services Management Table */}
      <Card>
        {/* Table Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Title2>Services Management</Title2>
              {selectedServices.size > 0 && (
                <Badge appearance="filled" color="brand">{selectedServices.size} selected</Badge>
              )}
            </div>
            <Button 
              appearance="primary"
              disabled={selectedServices.size === 0}
              icon={<Play20Regular />}
              onClick={() => setShowBulkModal(true)}
            >
              Deploy Selected
            </Button>
          </div>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Field>
              <Input
                placeholder="Search services..."
                contentBefore={<Search20Regular />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '250px' }}
              />
            </Field>
            <Field>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #d1d1d1', borderRadius: '4px', fontSize: '14px' }}
              >
                <option value="">All Status</option>
                <option value="ready">Ready to Deploy</option>
                <option value="not-deployed">Not Deployed</option>
                <option value="missing-pfgold">Missing in PFGold</option>
                <option value="config-error">Configuration Error</option>
              </select>
            </Field>
            <Field>
              <select
                value={configFilter}
                onChange={(e) => setConfigFilter(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #d1d1d1', borderRadius: '4px', fontSize: '14px' }}
              >
                <option value="">All Configurations</option>
                <option value="both">In Both Files</option>
                <option value="dragon-only">Dragon Only</option>
                <option value="pfgold-only">PFGold Only</option>
              </select>
            </Field>
            <Button appearance="secondary" onClick={() => {
              setSearchQuery('')
              setStatusFilter('')
              setConfigFilter('')
            }}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Table Content */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell style={{ width: '48px' }}>
                <Checkbox
                  checked={selectedServices.size > 0 && selectedServices.size === filteredServices.filter(s => 
                    s.status === 'ready' || (s.status === 'not-deployed' && s.readyToDeploy)
                  ).length}
                  onChange={handleSelectAll}
                />
              </TableHeaderCell>
              <TableHeaderCell>Service Name</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell style={{ textAlign: 'center' }}>Dragon</TableHeaderCell>
              <TableHeaderCell style={{ textAlign: 'center' }}>PFGold</TableHeaderCell>
              <TableHeaderCell>Current Version</TableHeaderCell>
              <TableHeaderCell>Default Pipeline</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => {
              const canSelect = service.status === 'ready' || (service.status === 'not-deployed' && service.readyToDeploy)
              return (
                <TableRow key={service.id}>
                  <TableCell>
                    <Checkbox
                      disabled={!canSelect}
                      checked={selectedServices.has(service.id)}
                      onChange={() => handleServiceSelection(service.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '8px',
                        backgroundColor: `${service.iconColor}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getServiceIcon(service.icon, service.iconColor)}
                      </div>
                      <div>
                        <Button
                          appearance="subtle"
                          onClick={() => handleServiceClick(service.name)}
                          style={{ padding: 0, minHeight: 'auto', fontWeight: '600', cursor: 'pointer' }}
                        >
                          {service.name}
                        </Button>
                        <Body1 style={{ fontSize: '12px', color: '#616161', marginTop: '2px' }}>
                          {service.description}
                        </Body1>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(service.status, service.readyToDeploy)}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {service.inDragon ? (
                      <CheckmarkCircle20Filled style={{ color: '#107c10' }} />
                    ) : (
                      <DismissCircle20Filled style={{ color: '#d13438' }} />
                    )}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {service.inPFGold ? (
                      <CheckmarkCircle20Filled style={{ color: '#107c10' }} />
                    ) : (
                      <DismissCircle20Filled style={{ color: '#d13438' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      {service.currentVersion || 'null'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {service.pipeline ? (
                      <div>
                        <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>{service.pipeline}</div>
                        <div style={{ fontSize: '11px', color: '#616161' }}>Latest: {service.pipelineVersion}</div>
                      </div>
                    ) : (
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#616161' }}>-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {service.status === 'missing-pfgold' && (
                        <>
                          <Button size="small" appearance="primary">Add to PFGold</Button>
                          <Button size="small" appearance="secondary">Remove from Dragon</Button>
                        </>
                      )}
                      {service.status === 'config-error' && (
                        <>
                          <Button size="small" appearance="secondary">Remove from PFGold</Button>
                          <Button size="small" appearance="primary">Add to Dragon</Button>
                        </>
                      )}
                      {service.status === 'not-deployed' && !service.readyToDeploy && (
                        <Button size="small" appearance="primary">Prepare for Deployment</Button>
                      )}
                      {service.status === 'not-deployed' && service.readyToDeploy && (
                        <Button size="small" appearance="secondary">Cancel Preparation</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {/* Table Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Body1 style={{ fontSize: '12px', color: '#616161' }}>
            Showing {filteredServices.length} of {services.length} services
          </Body1>
        </div>
      </Card>

      {/* Bulk Deploy Modal */}
      {showBulkModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <Card style={{ padding: '24px', maxWidth: '400px', width: '100%', margin: '16px' }}>
            <Title2 style={{ marginBottom: '16px' }}>Deploy Selected Services</Title2>
            <Body1 style={{ marginBottom: '16px' }}>
              Are you sure you want to deploy {selectedServices.size} selected service(s)?
            </Body1>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button appearance="secondary" onClick={() => setShowBulkModal(false)}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={() => {
                console.log('Deploy services:', selectedServices)
                setShowBulkModal(false)
                setSelectedServices(new Set())
              }}>
                Deploy Now
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default VEDetail
