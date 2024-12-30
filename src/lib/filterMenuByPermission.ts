import get from "lodash.get";
export const filterMenuByPermission = (menuConfig: any[], permision: any[]) => {
  const userPermissions = permision?.length
    ? permision.map((e) => get(e, "name"))
    : [];
    console.log(userPermissions)
  return menuConfig
    .map((menu) => {
      // Filter children berdasarkan permission user
      const filteredChildren = menu.children?.filter((child: any) =>
        child.permision.some((perm: any) => userPermissions.includes(perm))
      );

      // Periksa apakah menu utama atau salah satu child memiliki permission yang sesuai
      const hasPermission =
        menu.permision.some((perm: any) => userPermissions.includes(perm)) ||
        (filteredChildren && filteredChildren.length > 0);

      // Jika cocok, kembalikan menu dengan children yang sudah difilter
      if (hasPermission) {
        return {
          ...menu,
          children: filteredChildren,
        };
      }
      return null; // Tidak menyertakan menu yang tidak memiliki permission
    })
    .filter((menu) => menu !== null); // Hapus menu yang null
};
