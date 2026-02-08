# Student Success Comic - Backend API

A Node.js + Express backend with OpenAI integration for the Student Success Comic project.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI-powered predictions and advice
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── openai.config.js    # OpenAI client configuration
│   ├── controllers/
│   │   ├── ai.controller.js     # AI endpoints logic
│   │   └── student.controller.js # Student data endpoints
│   ├── routes/
│   │   ├── ai.routes.js         # AI API routes
│   │   └── student.routes.js    # Student API routes
│   └── index.js                 # Express server entry point
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your OpenAI API key
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env` file

### 4. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Health Check

- `GET /api/health` - Check if server is running

### AI Endpoints

- `POST /api/ai/predict` - Generate student success prediction
- `POST /api/ai/study-advice` - Get personalized study advice
- `POST /api/ai/comic-narrative` - Generate comic strip narrative
- `POST /api/ai/chat` - General AI chat

### Student Endpoints

- `GET /api/students/:id` - Get student profile
- `PUT /api/students/:id` - Update student data
- `GET /api/students/:id/progress` - Get student progress/analytics
- `POST /api/students/:id/what-if` - Analyze "What If" scenarios

## 📝 Example Requests

### Generate Prediction

```bash
curl -X POST http://localhost:5000/api/ai/predict \
  -H "Content-Type: application/json" \
  -d '{
    "studentData": {
      "attendance": 92,
      "assignmentCompletion": 88,
      "quizScores": 85,
      "studyHours": 15,
      "participation": 78
    }
  }'
```

### Get Study Advice

```bash
curl -X POST http://localhost:5000/api/ai/study-advice \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Mathematics",
    "currentLevel": "Intermediate",
    "learningStyle": "Visual",
    "challenges": "Understanding calculus concepts"
  }'
```

### What-If Scenario

```bash
curl -X POST http://localhost:5000/api/students/1/what-if \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "What if I increase my study hours from 15 to 25 per week?"
  }'
```

## 🔒 Security Notes

- Never commit your `.env` file
- Keep your OpenAI API key secret
- Use environment variables for all sensitive data
- In production, implement proper authentication

## 📄 License

ISC
