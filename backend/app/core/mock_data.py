MOCK_DATA = {
    "ves": [
        {
            "name": "SovBase",
            "description": "Base sovereign virtual environment for core services",
            "ve_type": "B Type",
            "group": "SovBaseVEs",
            "stats": {
                "total_services": 67,
                "deployed_services": 62,
                "dragon_services": 89,
                "pfgold_services": 67,
                "ready_to_deploy": 5
            },
            "is_favorite": True,
            "last_updated": "2024-12-20T14:00:00Z"
        }
    ],
    "services": {
        "SovBase": [
            {
                "id": "owamailb2",
                "name": "OwaMailB2",
                "description": "Outlook Web App Mail Backend",
                "status": "ready",
                "in_dragon": True,
                "in_pfgold": True,
                "current_version": "v2.1.234",
                "pipeline": "ExchangeMailPipeline",
                "pipeline_version": "v3.2.1",
                "icon": "mail",
                "icon_color": "blue",
                "ready_to_deploy": True
            }
        ]
    },
    "deployment_history": []
}
                "total_services": 1,
                "deployed_services": 1,
                "dragon_services": 1,
                "pfgold_services": 1,
                "ready_to_deploy": 0
            },
            "is_favorite": True,
            "last_updated": "2024-12-20T14:00:00Z"
        },
        {
            "name": "GraphConnectorsB2-SOV",
            "description": "Graph Connectors B2 services",
            "ve_type": "B2 Type",
            "group": "ModelB2SovVEs",
            "stats": {
                "total_services": 1,
                "deployed_services": 0,
                "dragon_services": 1,
                "pfgold_services": 0,
                "ready_to_deploy": 1
            },
            "is_favorite": False,
            "last_updated": "2024-12-20T10:00:00Z"
        },
        {
            "name": "FlowControlB2-SOV",
            "description": "Flow Control B2 services",
            "ve_type": "B2 Type",
            "group": "ModelB2SovVEs",
            "stats": {
                "total_services": 1,
                "deployed_services": 0,
                "dragon_services": 1,
                "pfgold_services": 0,
                "ready_to_deploy": 0
            },
            "is_favorite": False,
            "last_updated": "2024-12-20T12:00:00Z"
        },
        {
            "name": "TodoB2-SOV",
            "description": "Todo B2 services",
            "ve_type": "B2 Type",
            "group": "ModelB2SovVEs",
            "stats": {
                "total_services": 1,
                "deployed_services": 1,
                "dragon_services": 1,
                "pfgold_services": 1,
                "ready_to_deploy": 0
            },
            "is_favorite": False,
            "last_updated": "2024-12-20T11:00:00Z"
        }
    ],
    "services": {
        "SovBase": [
            {
                "id": "owamailb2",
                "name": "OwaMailB2",
                "description": "Outlook Web App Mail Backend",
                "status": "ready",
                "in_dragon": True,
                "in_pfgold": True,
                "current_version": "v2.1.234",
                "pipeline": "ExchangeMailPipeline",
                "pipeline_version": "v3.2.1",
                "icon": "mail",
                "icon_color": "blue",
                "ready_to_deploy": True
            },
            {
                "id": "graphconnectors",
                "name": "GraphConnectors",
                "description": "Graph Connectors Service",
                "status": "not-deployed",
                "in_dragon": True,
                "in_pfgold": True,
                "current_version": None,
                "pipeline": "GraphConnectorsPipeline",
                "pipeline_version": "v2.8.5",
                "icon": "flash",
                "icon_color": "orange",
                "ready_to_deploy": False
            },
            {
                "id": "flowcontrol",
                "name": "FlowControl",
                "description": "Flow Control Service",
                "status": "missing-pfgold",
                "in_dragon": True,
                "in_pfgold": False,
                "current_version": None,
                "pipeline": "FlowControlPipeline",
                "pipeline_version": "v1.9.3",
                "icon": "activity",
                "icon_color": "yellow",
                "ready_to_deploy": False
            },
            {
                "id": "invalidservice",
                "name": "InvalidService",
                "description": "Service not in Dragon map",
                "status": "config-error",
                "in_dragon": False,
                "in_pfgold": True,
                "current_version": "v1.0.0",
                "pipeline": None,
                "pipeline_version": None,
                "icon": "alert",
                "icon_color": "red",
                "ready_to_deploy": False
            }
        ]
    },
    "deployment_history": [
        {
            "id": "deploy-001",
            "ve_name": "SovBase",
            "service_names": ["OwaMailB2", "GraphConnectors"],
            "status": "success",
            "started_at": "2024-12-20T10:30:00Z",
            "completed_at": "2024-12-20T10:45:00Z",
            "build_version": "20241220.5",
            "deployed_by": "john.doe@example.com",
            "duration": "15m"
        },
        {
            "id": "deploy-002",
            "ve_name": "ModelBSov",
            "service_names": ["FlowControl"],
            "status": "running",
            "started_at": "2024-12-20T11:00:00Z",
            "completed_at": None,
            "build_version": "20241220.4",
            "deployed_by": "jane.smith@example.com",
            "duration": None
        }
    ]
}
