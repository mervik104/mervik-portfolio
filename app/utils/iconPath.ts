export function iconPath(icon: string) {
    const [prefix, name] = icon.split(':')
    return `/icons/${prefix}-${name}.svg`
}