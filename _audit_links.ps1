$ErrorActionPreference = "Continue"
$root = 'C:\Users\user\Desktop\The Flyover Bridge Africa'
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File

foreach ($f in $htmlFiles) {
    Write-Output ("=== " + $f.Name + " ===")
    try {
        $content = Get-Content -Path $f.FullName -Raw
        $regex = [regex]'href="([^"]*)"'
        $found = $regex.Matches($content)
        $uniqueLinks = $found | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
        foreach ($link in $uniqueLinks) {
            Write-Output $link
        }
    } catch {
        Write-Output ("ERROR: " + $_.Exception.Message)
    }
    Write-Output ""
}
