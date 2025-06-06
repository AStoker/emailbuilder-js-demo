import { Reader } from '@usewaypoint/email-builder'
import { createRoot, type Root } from 'react-dom/client'

export class ReactConnector {
  root: Root

  constructor(targetEl: HTMLElement) {
    this.root = createRoot(targetEl)
  }
  render(configuration: any) {
    this.root.render(<Reader configuration={configuration} />)
  }
}
