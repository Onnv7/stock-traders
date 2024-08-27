export function getCurrentDateFormatted(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên phải cộng thêm 1
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
