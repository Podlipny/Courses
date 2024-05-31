file1=$(cat database/file1.ndjson| grep gmail | wc -l | bc)
file2=$(cat database/file2.ndjson| grep gmail | wc -l | bc)
file3=$(cat database/file3.ndjson| grep gmail | wc -l | bc)
current=$(cat database/output-gmail.ndjson | wc -l | bc)

total=$(echo "$file1 + $file2 + $file3" | bc )
if [ "$total" = "$current" ]; then
  echo "all right - found $current items :)"
else
  echo "oh no the numbers don't match: current $current, expected: $total"
fi