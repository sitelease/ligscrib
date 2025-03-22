export function yaml(icons : Map<string, string>) : string {

  const yaml = new Array<string>();
  for (const [icon, iconSelectors] of icons) {
    let iconDashed = icon.replace(/_/g, "-");
    let iconLabel = icon.replace(/_/g, " ");
    yaml.push(`
${iconDashed}:
  changes:
  - 6.7.0
  familyStylesByLicense:
    free:
    - family: classic
      style: solid
  label: ${iconLabel.charAt(0).toUpperCase()}${iconLabel.slice(1)}
  selectors: ${iconSelectors}`);
  }

  return yaml.join('');
}
