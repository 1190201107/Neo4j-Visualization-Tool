import "./index.css"

const NODE_LABELS = "Node Labels"
const RELATIONSHIP_TYPES = "Relationship Types"
const PROEPERTY_KEYS = "Property Keys"

function makeLabels(items, type) {
  switch (type) {
    case NODE_LABELS:
      return items.map((item) => {
        return <div className="node-labels">{item}</div>
      })
    case RELATIONSHIP_TYPES:
      return items.map((item) => {
        return <div className="relationship-type">{item}</div>
      })
    case PROEPERTY_KEYS:
      return items.map((item) => {
        return <div className="property-keys">{item}</div>
      })
  }
}

export default function Information() {
  const nodeLabels = ["*", "movies", "teacher"]
  const RelationshipTypes = [
    "action_in",
    "follows",
    "producted",
    "make",
    "teach",
  ]
  const propertyKeys = ["title", "deptNo", "roles"]

  return (
    <>
      <div className="information-first-title">Database Information</div>
      <div style={{ padding: 10 }}>
        <div className="information-second-title">{NODE_LABELS}</div>
        <div className="label-box">{makeLabels(nodeLabels, NODE_LABELS)}</div>
        <div className="information-second-title">{RELATIONSHIP_TYPES}</div>
        <div className="label-box">
          {makeLabels(RelationshipTypes, RELATIONSHIP_TYPES)}
        </div>
        <div className="information-second-title">{PROEPERTY_KEYS}</div>
        <div className="label-box">
          {makeLabels(propertyKeys, PROEPERTY_KEYS)}
        </div>
      </div>
    </>
  )
}
