import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Title1, 
  Title2,
  Title3,
  Body1, 
  Card,
  Badge,
  Button,
  Field,
  Input,
  Textarea,
  Switch,
  Divider
} from '@fluentui/react-components'
import { 
  Star20Filled,
  Star20Regular,
  Edit20Regular,
  Play20Regular,
  Settings20Regular,
  Save20Regular,
  CheckmarkCircle20Filled,
  Mail20Regular,
  Flash20Regular,
  ArrowClockwise20Regular,
  Copy20Regular
} from '@fluentui/react-icons'

interface PipelineConfig {
  id: number
  name: string
  description: string
  type: string
  isDefault: boolean
  latestBuild: string
  dropUrl: string
  icon: string
}

interface ServiceDetail {
  name: string
  description: string
  status: 'healthy' | 'warning' | 'error'
  version: string
  buildType: string
  serviceType: string
  lastDeploy: string
  activePipelines: number
  isFavorite: boolean
}

const ServiceDetail: React.FC = () => {
  const { serviceName, veName } = useParams<{ serviceName: string; veName: string }>()
  const navigate = useNavigate()
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showSetDefaultModal, setShowSetDefaultModal] = useState(false)
  const [pendingDefaultPipeline, setPendingDefaultPipeline] = useState<{ id: number; name: string } | null>(null)
  const [quickPipelineId, setQuickPipelineId] = useState('1418')
  const [quickVersion, setQuickVersion] = useState('latest')

  const [serviceDetail] = useState<ServiceDetail>({
    name: serviceName || 'OwaMailB2',
    description: 'Outlook Web App Mail Backend Service',
    status: 'healthy',
    version: '20241220.5',
    buildType: 'RingPromotion',
    serviceType: 'B2 Type',
    lastDeploy: '2h',
    activePipelines: 3,
    isFavorite: false
  })

  const [pipelines] = useState<PipelineConfig[]>([
    {
      id: 1418,
      name: 'Main Pipeline',
      description: 'Primary build pipeline for OwaMailB2',
      type: 'main',
      isDefault: true,
      latestBuild: '20241220.5',
      dropUrl: 'VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.5?root=autopilot',
      icon: 'zap'
    },
    {
      id: 33874,
      name: 'Incremental Build',
      description: 'Fast incremental build pipeline',
      type: 'incremental',
      isDefault: false,
      latestBuild: '20241220.3',
      dropUrl: 'VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.3?root=autopilot',
      icon: 'refresh-cw'
    },
    {
      id: 31234,
      name: 'Incremental Build Alt',
      description: 'Alternative incremental build',
      type: 'incremental',
      isDefault: false,
      latestBuild: '20241220.2',
      dropUrl: 'VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/20241220.2?root=autopilot',
      icon: 'refresh-cw'
    }
  ])

  const [configJson, setConfigJson] = useState(`{
  "BuildType": "RingPromotion",
  "PipelineId": 1418,
  "IncrementalBuildPipelineId": 33874,
  "RingPromotionRootPath": "autopilot",
  "BuildRoot": "https://outlookgriffinservice.blob.core.windows.net/owamailb2/prod_image.txt",
  "PpeVeName": "OwaMailB2-PPE",
  "BuildPathPattern": "VSO://https://outlookweb.artifacts.visualstudio.com/DefaultCollection/_apis/drop/drops/owamailb2_ms/<BuildVersion>?root=autopilot"
}`)

  const getStatusBadge = (status: string) => {
    const configs = {
      healthy: { color: '#107c10', text: 'Healthy', icon: <CheckmarkCircle20Filled /> },
      warning: { color: '#f7b500', text: 'Warning', icon: <CheckmarkCircle20Filled /> },
      error: { color: '#d13438', text: 'Error', icon: <CheckmarkCircle20Filled /> }
    }
    const config = configs[status as keyof typeof configs] || configs.healthy
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: config.color }} />
        <span style={{ color: config.color, fontWeight: '500' }}>{config.text}</span>
      </div>
    )
  }

  const getServiceIcon = () => {
    if (serviceName?.toLowerCase().includes('mail')) return <Mail20Regular style={{ color: '#107c10' }} />
    return <Flash20Regular style={{ color: '#0f6cbd' }} />
  }

  const getPipelineIcon = (iconName: string) => {
    if (iconName === 'refresh-cw') return <ArrowClockwise20Regular />
    return <Flash20Regular />
  }

  const handleSetDefaultPipeline = (pipelineId: number, pipelineName: string) => {
    setPendingDefaultPipeline({ id: pipelineId, name: pipelineName })
    setShowSetDefaultModal(true)
  }

  const confirmSetDefault = () => {
    if (pendingDefaultPipeline) {
      console.log(`Setting pipeline ${pendingDefaultPipeline.id} as default`)
      // Update pipeline default status logic here
    }
    setShowSetDefaultModal(false)
    setPendingDefaultPipeline(null)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      console.log('Copied to clipboard:', text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const quickDeploy = () => {
    console.log(`Quick deploy with pipeline ${quickPipelineId}, version ${quickVersion}`)
  }

  const validateConfig = () => {
    try {
      JSON.parse(configJson)
      console.log('Configuration is valid')
      return true
    } catch (e) {
      console.log('Configuration is invalid')
      return false
    }
  }

  const formatConfig = () => {
    try {
      const parsed = JSON.parse(configJson)
      setConfigJson(JSON.stringify(parsed, null, 2))
    } catch (e) {
      console.error('Failed to format JSON')
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: '#616161' }}>
        <Button appearance="subtle" onClick={() => navigate('/ve-management')} style={{ padding: 0, minHeight: 'auto' }}>
          VE Management
        </Button>
        <span>›</span>
        <Button appearance="subtle" onClick={() => navigate(`/ve/${veName}`)} style={{ padding: 0, minHeight: 'auto' }}>
          {veName}
        </Button>
        <span>›</span>
        <span style={{ color: '#242424', fontWeight: '500' }}>{serviceName}</span>
      </nav>

      {/* Service Header */}
      <Card style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px',
              backgroundColor: '#dff6dd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {getServiceIcon()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Title1>{serviceDetail.name}</Title1>
                <Button
                  appearance="subtle"
                  icon={serviceDetail.isFavorite ? <Star20Filled /> : <Star20Regular />}
                  style={{ padding: '4px', minWidth: 'auto', color: serviceDetail.isFavorite ? '#faa06b' : '#616161' }}
                />
              </div>
              <Body1 style={{ marginBottom: '12px' }}>{serviceDetail.description}</Body1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Badge appearance="filled" color="important">{serviceDetail.buildType}</Badge>
                <Badge appearance="filled" color="success">{serviceDetail.serviceType}</Badge>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              {getStatusBadge(serviceDetail.status)}
              <div style={{ fontSize: '12px', color: '#616161', marginTop: '4px' }}>Version: {serviceDetail.version}</div>
            </div>
            <Button 
              appearance="primary"
              icon={<Edit20Regular />}
              onClick={() => setShowConfigModal(true)}
            >
              Edit Configuration
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div style={{ textAlign: 'center', padding: '16px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#242424', marginBottom: '4px' }}>{serviceDetail.version}</div>
            <div style={{ fontSize: '14px', color: '#616161' }}>Current Build</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#0f6cbd', marginBottom: '4px' }}>{serviceDetail.activePipelines}</div>
            <div style={{ fontSize: '14px', color: '#616161' }}>Active Pipelines</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#242424', marginBottom: '4px' }}>{serviceDetail.lastDeploy}</div>
            <div style={{ fontSize: '14px', color: '#616161' }}>Last Deploy</div>
          </div>
        </div>
      </Card>

      {/* Quick Deploy */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Play20Regular style={{ color: '#107c10' }} />
          <Title2>Quick Deploy</Title2>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Field label="Pipeline:">
                <select 
                  value={quickPipelineId}
                  onChange={(e) => setQuickPipelineId(e.target.value)}
                  style={{ padding: '6px 8px', border: '1px solid #d1d1d1', borderRadius: '4px', fontSize: '14px' }}
                >
                  <option value="1418">Main Pipeline (Default)</option>
                  <option value="33874">Incremental Build</option>
                  <option value="custom">Custom Pipeline</option>
                </select>
              </Field>
              <Field label="Version:">
                <select 
                  value={quickVersion}
                  onChange={(e) => setQuickVersion(e.target.value)}
                  style={{ padding: '6px 8px', border: '1px solid #d1d1d1', borderRadius: '4px', fontSize: '14px' }}
                >
                  <option value="latest">Latest (20241220.5)</option>
                  <option value="20241220.4">20241220.4</option>
                  <option value="20241220.3">20241220.3</option>
                </select>
              </Field>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button appearance="secondary" icon={<Settings20Regular />}>
                Advanced
              </Button>
              <Button appearance="primary" icon={<Play20Regular />} onClick={quickDeploy} style={{ backgroundColor: '#107c10' }}>
                Deploy Now
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Pipeline Management */}
      <Card>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flash20Regular style={{ color: '#0f6cbd' }} />
            <Title2>Pipeline Management</Title2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', color: '#616161' }}>Default:</span>
            <Badge appearance="filled" color="brand">Main Pipeline (ID: 1418)</Badge>
          </div>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {pipelines.map((pipeline) => (
              <Card 
                key={pipeline.id}
                style={{ 
                  padding: '16px', 
                  cursor: 'pointer',
                  border: pipeline.isDefault ? '2px solid #0f6cbd' : '1px solid #e0e0e0',
                  backgroundColor: pipeline.isDefault ? '#e3f2fd' : 'white'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getPipelineIcon(pipeline.icon)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', color: '#242424' }}>{pipeline.name}</div>
                      <div style={{ fontSize: '12px', color: '#616161' }}>ID: {pipeline.id}</div>
                    </div>
                  </div>
                  <Badge appearance={pipeline.isDefault ? "filled" : "outline"} color={pipeline.isDefault ? "brand" : "subtle"}>
                    {pipeline.isDefault ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star20Filled style={{ width: '12px', height: '12px' }} />
                        Default
                      </div>
                    ) : pipeline.type}
                  </Badge>
                </div>
                
                <Body1 style={{ fontSize: '12px', marginBottom: '12px' }}>{pipeline.description}</Body1>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', color: '#616161' }}>Latest:</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>{pipeline.latestBuild}</span>
                  </div>
                  <div style={{ 
                    backgroundColor: '#f5f5f5', 
                    padding: '8px', 
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: '#616161',
                    wordBreak: 'break-all',
                    position: 'relative'
                  }}>
                    {pipeline.dropUrl}
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Copy20Regular />}
                      onClick={() => copyToClipboard(pipeline.dropUrl)}
                      style={{ 
                        position: 'absolute', 
                        top: '4px', 
                        right: '4px', 
                        padding: '2px',
                        minWidth: 'auto',
                        height: 'auto'
                      }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'center', paddingTop: '12px', borderTop: '1px solid #e0e0e0' }}>
                  {!pipeline.isDefault ? (
                    <Button 
                      size="small" 
                      appearance="secondary"
                      icon={<Star20Regular />}
                      onClick={() => handleSetDefaultPipeline(pipeline.id, pipeline.name)}
                    >
                      Set as Default
                    </Button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#0f6cbd' }}>
                      <Star20Filled style={{ width: '16px', height: '16px' }} />
                      <span style={{ fontSize: '14px' }}>Default Pipeline</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      {/* Set Default Pipeline Modal */}
      {showSetDefaultModal && (
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
            <Title2 style={{ marginBottom: '16px' }}>Set Default Pipeline</Title2>
            <Body1 style={{ marginBottom: '16px' }}>
              Are you sure you want to set <strong>{pendingDefaultPipeline?.name}</strong> as the default pipeline for <strong>{serviceDetail.name}</strong>?
            </Body1>
            <div style={{ backgroundColor: '#fff4ce', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
              <Title3 style={{ fontSize: '14px', marginBottom: '4px' }}>Impact</Title3>
              <ul style={{ fontSize: '12px', margin: 0, paddingLeft: '16px' }}>
                <li>VE batch deployment will use this pipeline by default</li>
                <li>Quick Deploy allows selecting any pipeline for deployment</li>
                <li>Configuration will be updated in service settings</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button appearance="secondary" onClick={() => setShowSetDefaultModal(false)}>
                Cancel
              </Button>
              <Button appearance="primary" icon={<Star20Filled />} onClick={confirmSetDefault}>
                Set as Default
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Configuration Editor Modal */}
      {showConfigModal && (
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
          <Card style={{ padding: 0, maxWidth: '800px', width: '90%', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit20Regular style={{ color: '#8b5cf6' }} />
                <Title2>Edit Service Configuration</Title2>
              </div>
              <Button appearance="subtle" onClick={() => setShowConfigModal(false)}>×</Button>
            </div>
            
            <div style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Title3>Service: {serviceDetail.name}</Title3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="small" appearance="secondary" onClick={validateConfig}>
                    <CheckmarkCircle20Filled style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    Validate
                  </Button>
                  <Button size="small" appearance="secondary" onClick={formatConfig}>
                    <ArrowClockwise20Regular style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    Format
                  </Button>
                </div>
              </div>
              
              <Field label="Configuration JSON">
                <Textarea
                  value={configJson}
                  onChange={(e) => setConfigJson(e.target.value)}
                  rows={20}
                  style={{ fontFamily: 'monospace', fontSize: '12px', resize: 'vertical' }}
                />
              </Field>
            </div>
            
            <div style={{ padding: '24px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked />
                Create Pull Request
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button appearance="secondary" onClick={() => setShowConfigModal(false)}>
                  Cancel
                </Button>
                <Button appearance="primary" icon={<Save20Regular />} style={{ backgroundColor: '#8b5cf6' }}>
                  Save Configuration
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ServiceDetail
