@echo off
echo Initializing Git repository...
git init
git add .
git commit -m "Update: Added Google Analytics, Affiliate Links, and Keyboard Logic"
git branch -M main

echo.
echo ----------------------------------------------------------------
echo Repository prepared and changes committed!
echo.
echo NEXT STEPS:
echo 1. Create a new repository on GitHub (empty).
echo 2. Copy the "HTTPS" URL of that repository.
echo 3. Run the following command in your terminal:
echo.
echo    git remote add origin YOUR_GITHUB_REPO_URL_HERE
echo    git push -u origin main
echo.
echo ----------------------------------------------------------------
pause
