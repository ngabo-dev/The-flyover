$root = 'C:\Users\user\Desktop\The Flyover Bridge Africa'
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File

$old = 'Copyright 2022 <a href="#" class="copyright-link">codewithsadee</a>. All Rights Reserved.'
$new = 'Copyright 2026 The Flyover Bridge Africa. All Rights Reserved.'

foreach ($f in $htmlFiles) {
    $content = Get-Content -Path $f.FullName -Raw
    if ($content.Contains($old)) {
        $content = $content.Replace($old, $new)
        Set-Content -Path $f.FullName -Value $content -NoNewline
        Write-Output ($f.Name + " -> FIXED")
    } else {
        Write-Output ($f.Name + " -> no match")
    }
}
