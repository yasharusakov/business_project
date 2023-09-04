export function removeDuplicateObjects(array: any[], property: string) {
    const uniqueIds = [] as any[]

    return array.filter(element => {
        const isDuplicate = uniqueIds.includes(element[property])

        if (!isDuplicate) {
            uniqueIds.push(element[property])

            return true
        }
        return false
    })
}