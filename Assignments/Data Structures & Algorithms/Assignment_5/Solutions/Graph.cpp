
/*
    A  B  C  D
A   [0, 2, 4, 0]
B   [0, 0, 1, 7]
C   [0, 0, 0, 3]
D   [0, 0, 0, 0]
*/

#include <iostream>
#include <queue>
#include <stack>
#include <climits>

using namespace std;

template<class VertexType>
class Graph {
    int numVertices;                  // Current number of vertices
    VertexType vertices[50];          // Max 50 vertices
    int edegs[50][50];                // Adjacency Matrix (edge weights)
    bool marks[50];                   // Used in DFS & BFS to mark visited vertices

public:
    // constructor
    explicit Graph() {
        numVertices = 0;
        MakeEmpty();
    }

    // ================= basic methods =================
    void MakeEmpty() {
        // loop through all the elements => row => columns
            // mark it unvisited
            // make the edge weight 0
        // numVertices = 0

        for (int i = 0; i < 50; i++) {
            marks[i] = false;
            for (int j = 0; j < 50; j++)
                edegs[i][j] = 0;   // 0 means no edge
        }
        numVertices = 0;
    };

    bool IsEmpty() { return numVertices == 0; }
    bool IsFull()  { return numVertices == 50; }

    int GetIndex(const VertexType& vertex) {
        // loop through all the vertices
            // if: vertices[i] == vertex => return i
        // not found => return -1

        for (int i = 0; i < numVertices; i++)
            if (vertices[i] == vertex)
                return i;
        return -1;
    }

    void AddVertex(const VertexType& vertex) {
        // if the graph is full => return
        // add the vertex to the vertices array
        // loop over all the vertices
            // make the edge weight between them 0
        // increase the number of vertices

        if (IsFull()) return;
        vertices[numVertices] = vertex;
        for (int i = 0; i <= numVertices; i++) {
            edegs[numVertices][i] = 0;
            edegs[i][numVertices] = 0;
        }
        numVertices++;
    }

    void AddEdge(VertexType fromVertex, VertexType toVertex, int Weight) {
        // find the indices of the vertices
        // check both of them are found
            // make the edge weight = Weight
        // one of them / both are not found => error message

        int from = GetIndex(fromVertex);
        int to   = GetIndex(toVertex);
        if (from != -1 && to != -1)
            edegs[from][to] = Weight;   // Directed graph
        else 
            cout << "Vertex not found\n";
    }

    int GetPathWeight(VertexType fromVertex, VertexType toVertex) {
        // find the indices of the vertices
        // check both of them are found
            // retrun the edge weight
        // one of them / both are not found => -1
        
        
        int from = GetIndex(fromVertex);
        int to   = GetIndex(toVertex);
        if (from != -1 && to != -1)
            return edegs[from][to];
        return -1;
    }

    void GetAdjVertices(VertexType vertex, queue<VertexType>& VertexQ) {
        // find the index of the vertex
        // loop through all the vertices
            // check if there is connection between the givenVertex and the currentVertex => if the edge weight != 0 
                // T => add it to the queue
                // F => nothing

        int v = GetIndex(vertex);
        for (int i = 0; i < numVertices; i++)
            if (edegs[v][i] != 0)
                VertexQ.push(vertices[i]);
    }

    // ================= mark methods =================

    void ClearMarks() {                     // Mark all vertices as unvisited
        for (int i = 0; i < numVertices; i++)
            marks[i] = false;
    }

    void MarkVertex(VertexType vertex) {      // Mark a vertex as visited
        int v = GetIndex(vertex);
        if (v != -1) marks[v] = true;
    }

    bool IsMarked(VertexType vertex) {
        int v = GetIndex(vertex);
        return (v != -1 && marks[v]);
    }

    // ================= BFS =================
    void BreadthFirstSearch(const VertexType& startVertex, const VertexType& endVertex)
    {
        queue<VertexType> q, adj;

        ClearMarks();
        q.push(startVertex);
        MarkVertex(startVertex);

        while (!q.empty())
        {
            VertexType current = q.front();
            q.pop();

            cout << current << " ";

            if (current == endVertex) return;

            GetAdjVertices(current, adj);

            while (!adj.empty())
            {
                VertexType next = adj.front();
                adj.pop();

                if (!IsMarked(next))
                {
                    MarkVertex(next);
                    q.push(next);
                }
            }
        }
    }

    // ================= Dijkstra =================

    void Dijkstra(const VertexType& startVertex)        // Find shortest path from start → all vertices
    {
        int dist[50];
        bool visited[50];

        for (int i = 0; i < numVertices; i++)
        {
            dist[i] = INT_MAX;
            visited[i] = false;
        }

        int start = GetIndex(startVertex);
        dist[start] = 0;

        for (int count = 0; count < numVertices - 1; count++)
        {
            int minDist = INT_MAX;
            int u = -1;

            for (int i = 0; i < numVertices; i++)
                if (!visited[i] && dist[i] < minDist)
                {
                    minDist = dist[i];
                    u = i;
                }

            visited[u] = true;

            for (int v = 0; v < numVertices; v++)
                if (!visited[v] && edegs[u][v] &&
                    dist[u] != INT_MAX &&
                    dist[u] + edegs[u][v] < dist[v])
                {
                    dist[v] = dist[u] + edegs[u][v];
                }
        }

        // Print result
        for (int i = 0; i < numVertices; i++)
            cout << startVertex << " -> "
                 << vertices[i] << " = "
                 << dist[i] << endl;
    }
};



int main()
{
    Graph<char> g;

    g.AddVertex('A');
    g.AddVertex('B');
    g.AddVertex('C');
    g.AddVertex('D');
    g.AddVertex('E');

    g.AddEdge('A','B',2);
    g.AddEdge('A','C',4);
    g.AddEdge('B','C',1);
    g.AddEdge('B','D',7);
    g.AddEdge('C','E',3);
    g.AddEdge('D','E',1);

    cout << "BFS A -> E: ";
    g.BreadthFirstSearch('A','E');
    cout << endl;

    cout << "\nDijkstra from A:\n";
    g.Dijkstra('A');

    return 0;
}


/*
    (2)        (7)
  A ------> B --------> D
  |         |           |
 (4)       (1)         (1)
  |         |           |
  v         v           v
  C ------> E <---------
    (3)
*/