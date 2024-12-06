export const joinString = (data: any[], keys: string): string => {
  // Jika array kosong, tambahkan elemen baru
  console.log({data})
  if(!Array.isArray(data)) return ""
  if (!data.length) return "";
  // Pastikan nilai `name` unik
  const uniqueNames = new Set(data.map((item) => item?.[keys]));
  console.log(uniqueNames)
  // Gabungkan semua `name` menjadi string
  return data.map((item) => item.name).join(", ");
}
