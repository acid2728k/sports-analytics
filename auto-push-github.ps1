# Automatic GitHub Repository Creation and Push Script
# This script will try to create the repository and push automatically

param(
    [string]$GitHubToken = $env:GITHUB_TOKEN,
    [string]$GitHubUsername = ""
)

Write-Host "🚀 Sports Analytics - Auto GitHub Setup" -ForegroundColor Green
Write-Host ""

# Check if GitHub token is available
if (-not $GitHubToken) {
    Write-Host "⚠️  GitHub token not found in environment variables." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To create repository automatically, you need a GitHub Personal Access Token." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick setup:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/settings/tokens/new" -ForegroundColor White
    Write-Host "2. Token name: 'sports-analytics-setup'" -ForegroundColor White
    Write-Host "3. Select scope: 'repo' (full control of private repositories)" -ForegroundColor White
    Write-Host "4. Generate token and copy it" -ForegroundColor White
    Write-Host "5. Run this script with: .\auto-push-github.ps1 -GitHubToken YOUR_TOKEN -GitHubUsername YOUR_USERNAME" -ForegroundColor White
    Write-Host ""
    
    # Try to get username from git config
    $gitUser = git config --global user.name
    if ($gitUser) {
        Write-Host "Detected git user: $gitUser" -ForegroundColor Gray
        Write-Host "If this is your GitHub username, you can use it." -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "Alternatively, I'll open GitHub for manual creation..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    Start-Process "https://github.com/new?name=sports-analytics&description=Sports+Analytics+v.+0.1+-+Sports+statistics+and+probability+analysis+platform&private=false"
    
    Write-Host ""
    Write-Host "After creating the repository manually, run:" -ForegroundColor Cyan
    Write-Host "  git remote add origin https://github.com/YOUR_USERNAME/sports-analytics.git" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
    exit
}

if (-not $GitHubUsername) {
    Write-Host "❌ GitHub username is required!" -ForegroundColor Red
    Write-Host "Usage: .\auto-push-github.ps1 -GitHubToken YOUR_TOKEN -GitHubUsername YOUR_USERNAME" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ GitHub token found!" -ForegroundColor Green
Write-Host "Creating repository: sports-analytics..." -ForegroundColor Yellow

# Create repository via GitHub API
$headers = @{
    "Authorization" = "token $GitHubToken"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    name = "sports-analytics"
    description = "Sports Analytics v. 0.1 - Sports statistics and probability analysis platform"
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    
    Write-Host "✅ Repository created successfully!" -ForegroundColor Green
    Write-Host "   URL: $($response.html_url)" -ForegroundColor Cyan
    
    # Add remote and push
    Write-Host ""
    Write-Host "Setting up remote..." -ForegroundColor Yellow
    
    # Remove existing remote if any
    git remote remove origin 2>$null
    
    # Add remote
    $remoteUrl = "https://$GitHubToken@github.com/$GitHubUsername/sports-analytics.git"
    git remote add origin $remoteUrl
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 SUCCESS! Repository created and code pushed!" -ForegroundColor Green
        Write-Host "   View at: $($response.html_url)" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "⚠️  Push failed. Trying alternative method..." -ForegroundColor Yellow
        
        # Try with username in URL
        git remote set-url origin "https://$GitHubUsername@github.com/$GitHubUsername/sports-analytics.git"
        git push -u origin main
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ Error creating repository:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "1. Repository 'sports-analytics' already exists" -ForegroundColor White
    Write-Host "2. Token doesn't have 'repo' scope" -ForegroundColor White
    Write-Host "3. Invalid token or username" -ForegroundColor White
    Write-Host ""
    Write-Host "Trying to add remote anyway (repository might already exist)..." -ForegroundColor Yellow
    
    git remote remove origin 2>$null
    git remote add origin "https://$GitHubUsername@github.com/$GitHubUsername/sports-analytics.git"
    git push -u origin main
}

