SAMPLE_RESUME = {
    "header": {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "contact": "555-0100",
        "portfolio": "https://jane.dev",
        "address": "San Francisco, CA",
    },
    "education": [
        {
            "instituteName": "Example University",
            "degreeName": "B.S. Computer Science",
            "fromDate": "08/2020",
            "toDate": "05/2024",
            "cgpa": "3.8",
        }
    ],
    "experience": [
        {
            "roleTitle": "Software Engineer Intern",
            "instituteName": "Acme Corp",
            "fromDate": "06/2023",
            "toDate": "08/2023",
            "location": "Remote",
            "description": "Built internal tooling.",
            "certificateLink": None,
        }
    ],
    "projects": [
        {
            "projectTitle": "REMI",
            "description": "Resume management platform",
            "codebaseLink": "https://github.com/example/remi",
            "demoLink": None,
        }
    ],
    "customSections": [
        {
            "title": "Certifications",
            "entries": [
                {
                    "title": "AWS Cloud Practitioner",
                    "description": "Foundational cloud certification",
                    "link": "https://aws.amazon.com/certification/",
                }
            ],
        }
    ],
}


def test_create_resume(client):
    response = client.post("/resume/", json=SAMPLE_RESUME)

    assert response.status_code == 200

    data = response.json()
    assert data["id"] == 1
    assert data["header"]["name"] == "Jane Doe"
    assert len(data["education"]) == 1
    assert len(data["customSections"]) == 1
    assert len(data["customSections"][0]["entries"]) == 1


def test_get_resume(client):
    created = client.post("/resume/", json=SAMPLE_RESUME).json()

    response = client.get(f"/resume/{created['id']}")

    assert response.status_code == 200
    assert response.json()["header"]["email"] == "jane@example.com"


def test_update_resume_replaces_tree(client):
    created = client.post("/resume/", json=SAMPLE_RESUME).json()

    updated_payload = {
        **SAMPLE_RESUME,
        "header": {
            **SAMPLE_RESUME["header"],
            "name": "Jane Q. Doe",
        },
        "projects": [],
        "customSections": [],
    }

    response = client.put(
        f"/resume/{created['id']}",
        json=updated_payload,
    )

    assert response.status_code == 200

    data = response.json()
    assert data["header"]["name"] == "Jane Q. Doe"
    assert data["projects"] == []
    assert data["customSections"] == []
    assert len(data["education"]) == 1


def test_delete_resume(client):
    created = client.post("/resume/", json=SAMPLE_RESUME).json()

    delete_response = client.delete(f"/resume/{created['id']}")
    assert delete_response.status_code == 200

    get_response = client.get(f"/resume/{created['id']}")
    assert get_response.status_code == 404


def test_update_missing_resume_returns_404(client):
    response = client.put("/resume/999", json=SAMPLE_RESUME)

    assert response.status_code == 404
