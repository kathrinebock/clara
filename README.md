# Clara Design Tokens MCP Server

🎨 A Model Context Protocol (MCP) server that exposes your Clara design system tokens to Claude and other AI assistants.

**Use this to:**
- Generate prototypes that respect your design guidelines
- Share design tokens with your team automatically
- Query colors, typography, spacing, and effects programmatically
- Generate CSS variables from your design system

## Features

- ✅ Complete design token access (colors, typography, spacing, sizing, fonts, effects)
- ✅ REST API endpoints for easy integration
- ✅ CSS variable generation
- ✅ Color lookup by path
- ✅ Deployed on Railway for easy sharing with your team
- ✅ No database required - tokens stored in `tokens.js`

## Local Development

### Prerequisites
- Node.js 18+ 
- npm

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

The server will run on `http://localhost:3000`

3. **Test it:**
```bash
# Health check
curl http://localhost:3000/health

# Get all tokens
curl http://localhost:3000/tokens/all

# Get primitive colors
curl http://localhost:3000/tokens/colors/primitives

# Get semantic colors
curl http://localhost:3000/tokens/colors/semantic

# Get a specific color
curl http://localhost:3000/tokens/colors/primitives/red/600

# Get text styles
curl http://localhost:3000/tokens/text-styles

# Get spacing scale
curl http://localhost:3000/tokens/spacing

# Generate CSS variables
curl http://localhost:3000/tokens/css
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/tokens/all` | GET | All design tokens |
| `/tokens/colors/primitives` | GET | Primitive color palettes |
| `/tokens/colors/semantic` | GET | Semantic color tokens |
| `/tokens/colors/semantic?category=content` | GET | Semantic colors by category |
| `/tokens/colors/{path}` | GET | Get color by path (e.g., `primitives.red.600`) |
| `/tokens/text-styles` | GET | All typography styles |
| `/tokens/text-styles?category=headings` | GET | Text styles by category |
| `/tokens/text-styles?category=headings&style=h1` | GET | Specific text style |
| `/tokens/spacing` | GET | Spacing scale |
| `/tokens/sizing` | GET | Sizing scale |
| `/tokens/fonts` | GET | Font families |
| `/tokens/effects` | GET | Effects and shadows |
| `/tokens/css` | GET | Generate CSS variables |

## Update Your Design Tokens

Edit `tokens.js` to update your design system. The server will automatically use the latest values on restart.

```javascript
// tokens.js
const designTokens = {
  colors: { ... },
  spacing: { ... },
  textStyles: { ... },
  // etc
};
```

## Deploy to Railway

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Clara Design Tokens MCP Server"
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "Create Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository
5. Railway will automatically detect the Node.js project

### Step 3: Configure Environment

Railway will automatically:
- Detect the Node.js runtime
- Install dependencies with `npm install`
- Start the server with `npm start`
- Assign a public URL

### Step 4: Get Your Server URL

After deployment:
1. Go to your Railway project dashboard
2. Click the "Deployments" tab
3. Find your live URL (e.g., `https://clara-tokens-prod.railway.app`)
4. Test it: `https://clara-tokens-prod.clara.railway.app/health`

## Use with Claude

### Option 1: Direct API Calls

You can now call this server directly in Claude via HTTP requests.

### Option 2: Custom Instructions

Add this to your Claude custom instructions:

```
When I ask you to build prototypes or generate code, use these design tokens:
- Server: https://your-railway-url.railway.app
- Colors: GET /tokens/colors/semantic
- Typography: GET /tokens/text-styles
- Spacing: GET /tokens/spacing

Always reference these tokens to ensure brand compliance.
```

### Option 3: As an MCP Server

In your Claude desktop config (`~/.claude/config.json`):

```json
{
  "mcpServers": {
    "clara-tokens": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "PORT": "3001"
      }
    }
  }
}
```

## Share with Your Team

### Public Access

The API is open to everyone at your Railway URL. To add authentication:

1. Add API key validation in `server.js`:
```javascript
if (req.headers['authorization'] !== `Bearer ${process.env.API_KEY}`) {
  res.writeHead(401);
  res.end(JSON.stringify({ error: 'Unauthorized' }));
  return;
}
```

2. Set `API_KEY` environment variable in Railway dashboard

### Team Collaboration

1. **Share the URL** with your team
2. **Use in their projects:**
   ```bash
   curl https://your-railway-url.railway.app/tokens/all
   ```
3. **Update tokens centrally** - all changes propagate automatically

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `API_KEY` | (optional) | If set, requires Bearer token in Authorization header |

## Monitoring

### Health Check
```bash
curl https://your-railway-url.railway.app/health
```

### View Logs

In Railway dashboard:
1. Click your project
2. Go to "Deployments" 
3. Click the deployment
4. View logs in real-time

## Troubleshooting

### "Port already in use"
```bash
# Kill existing process on port 3000
lsof -ti:3000 | xargs kill -9
```

### "Cannot find module"
```bash
npm install
npm start
```

### Changes not showing up
1. Edit `tokens.js`
2. Restart the server
3. Or on Railway: commit and push changes

## Next Steps

- 🔐 Add authentication for team security
- 🔄 Connect to a Figma API to auto-sync tokens
- 📊 Add analytics to track token usage
- 🎯 Create CLI tool to fetch tokens locally
- 📱 Build web UI to browse tokens

## Support

For issues or questions:
1. Check the logs: `npm start`
2. Test endpoints locally first
3. Check Railway deployment logs

---

Made with 🎨 for Clara Design System
