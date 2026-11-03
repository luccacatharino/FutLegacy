$root = 'C:\Users\lucca\OneDrive\Desktop\projetos\futlegacy\referencias\reformulacao\copa'
New-Item -ItemType Directory -Path $root -Force | Out-Null
$teams = Get-Content 'work/overhaul/data/wc.json' -Raw | ConvertFrom-Json
$sources = @($teams.source | Sort-Object -Unique)
$results = @()
foreach ($source in $sources) {
  $title = [Uri]::UnescapeDataString(($source -split '/wiki/')[1].Split('#')[0])
  $url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=' + [Uri]::EscapeDataString($title)
  $file = Join-Path $root ($title.Replace(':','-').Replace('/','-') + '.json')
  if (Test-Path -LiteralPath $file) { $results += [PSCustomObject]@{source=$source;file=$file;ok=$true}; continue }
  Start-Sleep -Milliseconds 1200
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{'User-Agent'='FutLegacy historical roster audit (local browser game)'}
    [IO.File]::WriteAllText($file,$response.Content,[Text.UTF8Encoding]::new($false))
    $results += [PSCustomObject]@{source=$source;file=$file;ok=$true}
  } catch {
    $results += [PSCustomObject]@{source=$source;ok=$false;error=$_.Exception.Message}
  }
}
$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $root 'manifest.json') -Encoding utf8
$results | Select-Object source,ok | ConvertTo-Json
