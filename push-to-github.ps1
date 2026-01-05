# PowerShell script to push to GitHub
# Replace YOUR_USERNAME with your GitHub username

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername
)

Write-Host "Setting up remote repository..." -ForegroundColor Green

# Remove existing remote if any
git remote remove origin 2>$null

# Add remote
$remoteUrl = "https://github.com/$GitHubUsername/sports-analytics.git"
git remote add origin $remoteUrl

Write-Host "Remote added: $remoteUrl" -ForegroundColor Green
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted for GitHub credentials." -ForegroundColor Yellow
Write-Host ""

# Push to GitHub
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/$GitHubUsername/sports-analytics" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Push failed. Please check:" -ForegroundColor Red
    Write-Host "1. Repository exists on GitHub: https://github.com/$GitHubUsername/sports-analytics" -ForegroundColor Yellow
    Write-Host "2. You have proper authentication (Personal Access Token or SSH)" -ForegroundColor Yellow
    Write-Host "3. You have write access to the repository" -ForegroundColor Yellow
}

