export type LessonStatus = "Source unchanged" | "Revalidation required";

export type CodebaseMemoryNode = {
  id: string;
  label: string;
  kind: "entry" | "dependency" | "policy";
  summary: string;
};

export type CodebaseMemoryEdge = {
  from: string;
  to: string;
  label: string;
};

export type CodebaseMemoryTask = {
  id: string;
  label: string;
  prompt: string;
  guide: string;
  lesson: string;
  reuseWhen: string;
  invalidateWhen: string;
  supportingSourceId: string;
  nodeIds: string[];
  edgeIds: Array<[string, string]>;
};

export type CodebaseMemoryView = {
  task: CodebaseMemoryTask;
  nodes: CodebaseMemoryNode[];
  edges: Array<CodebaseMemoryEdge & { fromLabel: string; toLabel: string }>;
  supportingSource: CodebaseMemoryNode;
  supportingChanged: boolean;
  status: LessonStatus;
  freshnessNote: string;
  correctnessNote: string;
};

const nodes: CodebaseMemoryNode[] = [
  {
    id: "checkout-adapter",
    label: "CheckoutAdapter",
    kind: "entry",
    summary: "Coordinates checkout calls and maps typed failures for the caller."
  },
  {
    id: "payment-client",
    label: "PaymentClient",
    kind: "dependency",
    summary: "Issues payment requests and returns status codes without retrying them."
  },
  {
    id: "retry-policy",
    label: "RetryPolicy",
    kind: "policy",
    summary: "Owns attempt caps and which payment statuses are retryable."
  },
  {
    id: "inventory-client",
    label: "InventoryClient",
    kind: "dependency",
    summary: "Looks up availability and can time out independently of payment."
  },
  {
    id: "error-mapper",
    label: "ErrorMapper",
    kind: "policy",
    summary: "Converts inventory failures into typed checkout errors."
  }
];

const edges: CodebaseMemoryEdge[] = [
  { from: "checkout-adapter", to: "payment-client", label: "calls" },
  { from: "payment-client", to: "retry-policy", label: "uses" },
  { from: "checkout-adapter", to: "inventory-client", label: "calls" },
  { from: "inventory-client", to: "error-mapper", label: "uses" }
];

export const codebaseMemoryTasks: CodebaseMemoryTask[] = [
  {
    id: "retry-backoff",
    label: "Add retry backoff to the checkout adapter",
    prompt: "A fresh coding agent is asked to retry failed payment calls with backoff.",
    guide:
      "Checkout payments: RetryPolicy owns attempt caps and retryable statuses. CheckoutAdapter should call PaymentClient once per attempt and leave backoff in RetryPolicy.",
    lesson:
      "RetryPolicy already caps attempts at three and treats 429 as retryable. Do not add a second retry loop inside CheckoutAdapter.",
    reuseWhen: "RetryPolicy still owns the attempt cap and the 429 classification.",
    invalidateWhen: "RetryPolicy's attempt-cap or retryable-status contract changes.",
    supportingSourceId: "retry-policy",
    nodeIds: ["checkout-adapter", "payment-client", "retry-policy"],
    edgeIds: [
      ["checkout-adapter", "payment-client"],
      ["payment-client", "retry-policy"]
    ]
  },
  {
    id: "timeout-surface",
    label: "Surface timeout errors from inventory lookup",
    prompt: "A fresh coding agent is asked to make inventory timeouts visible on the checkout path.",
    guide:
      "Inventory lookup: ErrorMapper converts inventory timeouts into typed CheckoutTimeout values. CheckoutAdapter should surface that type instead of wrapping a generic Error.",
    lesson:
      "ErrorMapper already converts inventory timeouts into CheckoutTimeout. Surface that type; do not swallow the timeout as an unclassified failure.",
    reuseWhen: "ErrorMapper still emits CheckoutTimeout for inventory timeouts.",
    invalidateWhen: "ErrorMapper's timeout classification or exported error type changes.",
    supportingSourceId: "error-mapper",
    nodeIds: ["checkout-adapter", "inventory-client", "error-mapper"],
    edgeIds: [
      ["checkout-adapter", "inventory-client"],
      ["inventory-client", "error-mapper"]
    ]
  }
];

const nodeById: Record<string, CodebaseMemoryNode> = Object.fromEntries(nodes.map((node) => [node.id, node]));
const edgeByPair: Record<string, CodebaseMemoryEdge> = Object.fromEntries(edges.map((edge) => [`${edge.from}->${edge.to}`, edge]));

function requireNode(id: string): CodebaseMemoryNode {
  const node = nodeById[id];
  if (!node) {
    throw new Error(`Unknown synthetic codebase-memory node: ${id}`);
  }
  return node;
}

function requireEdge(from: string, to: string): CodebaseMemoryEdge {
  const edge = edgeByPair[`${from}->${to}`];
  if (!edge) {
    throw new Error(`Unknown synthetic codebase-memory edge: ${from} -> ${to}`);
  }
  return edge;
}

export const defaultCodebaseMemoryTaskId = codebaseMemoryTasks[0].id;

export function resolveCodebaseMemoryView(taskId: string, supportingChanged: boolean): CodebaseMemoryView {
  const task = codebaseMemoryTasks.find((item) => item.id === taskId) ?? codebaseMemoryTasks[0];
  const selectedNodes = task.nodeIds.map(requireNode);
  const selectedEdges = task.edgeIds.map(([from, to]) => {
    const edge = requireEdge(from, to);
    return {
      ...edge,
      fromLabel: requireNode(from).label,
      toLabel: requireNode(to).label
    };
  });
  const supportingSource = requireNode(task.supportingSourceId);
  const status: LessonStatus = supportingChanged ? "Revalidation required" : "Source unchanged";

  return {
    task,
    nodes: selectedNodes,
    edges: selectedEdges,
    supportingSource,
    supportingChanged,
    status,
    freshnessNote: supportingChanged
      ? `${supportingSource.label} changed in this illustrative fixture. The retained lesson can no longer be reused until its reuse condition is checked against the new source.`
      : `${supportingSource.label} is unchanged in this illustrative fixture. Source freshness is intact, which only means the supporting file has not moved — not that the lesson is still behaviorally correct.`,
    correctnessNote:
      "Source freshness is not behavioral correctness. A freshness check can flag that supporting source changed. Tests and runtime evidence are what establish whether the remembered behavior still holds."
  };
}

export function listCodebaseMemoryTaskOptions() {
  return codebaseMemoryTasks.map((task) => ({ id: task.id, label: task.label, prompt: task.prompt }));
}
