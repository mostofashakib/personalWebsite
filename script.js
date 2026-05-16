        // Page navigation functionality
        function showPage(pageId) {
            // Scroll to top of the page instantly to prevent flickering
            window.scrollTo(0, 0);

            // Hide all pages
            const pages = document.querySelectorAll('.page-content');
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Show selected page
            const selectedPage = document.getElementById(pageId);
            if (selectedPage) {
                selectedPage.classList.add('active');
            }

            // Update navigation active state
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            // Find and activate the corresponding nav item
            const activeNavItem = document.querySelector(`[onclick="showPage('${pageId}')"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }

        const blogs = [
            {
                title: "LLM Training Overview",
                description: "A visual mapping of how foundational models are designed, trained, aligned, and optimized for inference.",
                date: "November 29, 2025",
                readTime: "6 min read",
                url: "blog/llm_training_overview.html",
                category: "tech"
            },
            {
                title: "LLM Evaluation & Benchmark",
                description: "Evaluations, why they fail, how to use LLM as a Judge, and why agentic traces are harder to evaluate.",
                date: "November 28, 2025",
                readTime: "20 min read",
                url: "blog/llm_evaluation.html",
                category: "tech"
            },
            {
                title: "LLM as a Judge",
                description: "How to reliably use LLMs as evaluators, common biases, mitigation and structured outputs.",
                date: "November 27, 2025",
                readTime: "12 min read",
                url: "blog/llm_as_a_judge.html",
                category: "tech"
            },
            {
                title: "LLM Post-Training",
                description: "A look at SFT, RLHF, and DPO, and how base models are fine-tuned to follow instructions.",
                date: "November 25, 2025",
                readTime: "25 min read",
                url: "blog/post-training-llms.html",
                category: "tech"
            },
            // {
            //     title: "LLM Model Architecture",
            //     description: "Examining core layers: Attention, MLP, Positional Encodings, and variants like MQA and Mixture of Experts.",
            //     date: "March 29, 2026",
            //     readTime: "Coming Soon",
            //     url: "blog/model_architecture.html"
            // },
            // {
            //     title: "LLM Pre-Training",
            //     description: "Exploring compute scaling laws, distributed architectures, and mixed precision optimization.",
            //     date: "March 29, 2026",
            //     readTime: "Coming Soon",
            //     url: "blog/pretraining.html"
            // },
            // {
            //     title: "LLM Inference Ops",
            //     description: "Deep dive into model deployment via KV Cache, Speculative Decoding, and PagedAttention.",
            //     date: "March 29, 2026",
            //     readTime: "Coming Soon",
            //     url: "blog/inference.html"
            // },
            // {
            //     title: "High Fidelity Environments",
            //     description: "Testing model deployments via sandboxing, robust tooling, and mock production scenarios.",
            //     date: "March 29, 2026",
            //     readTime: "Coming Soon",
            //     url: "blog/high_fidelity_environment.html"
            // }
        ];

        const BLOGS_PER_PAGE = 6;
        let currentBlogPage = 1;
        let currentBlogCategory = 'all';

        function filterBlogs(category) {
            currentBlogCategory = category;
            currentBlogPage = 1; // Reset to first page

            // Update active state of buttons
            const buttons = document.querySelectorAll('.blog-filter-btn');
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('onclick').includes(`('${category}')`)) {
                    btn.classList.add('active');
                }
            });

            renderBlogs();
        }

        function renderBlogs() {
            const container = document.getElementById('blog-container');
            const pagination = document.getElementById('blog-pagination');

            if (currentBlogCategory === 'reading-list') {
                container.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: left; padding: 0.5rem 0; width: 100%;">
                        <h2 style="font-size: 1.4rem; color: var(--text-primary); margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">Startups</h2>
                        <ul class="achievements-list" style="margin-bottom: 2.5rem; list-style-type: disc; margin-left: 1.5rem; line-height: 1.8;">
                            <li><strong>Zero to One</strong> by Peter Thiel</li>
                            <li><strong>Built to Last</strong> by Jim Collins and Jerry I. Porras</li>
                            <li><strong>Negotiation Genius</strong> by Deepak Malhotra and Max Bazerman</li>
                            <li><strong>The Mom Test</strong> by Rob Fitzpatrick</li>
                            <li><strong>Start Small, Stay Small</strong> by Rob Walling</li>
                            <li><strong>The Unfair Advantage</strong> by Ash Ali and Hasan Kubba</li>
                        </ul>

                        <h2 style="font-size: 1.4rem; color: var(--text-primary); margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">Personal</h2>
                        <ul class="achievements-list" style="list-style-type: disc; margin-left: 1.5rem; line-height: 1.8;">
                            <li><strong>Meditations</strong> by Marcus Aurelius</li>
                            <li><strong>The 48 Laws of Power</strong> by Robert Greene</li>
                            <li><strong>Money: The True Story of a Made-Up Thing</strong> by Jacob Goldstein</li>
                        </ul>
                    </div>
                `;
                pagination.innerHTML = '';
                return;
            }

            // Filter blogs by category
            const filteredBlogs = currentBlogCategory === 'all'
                ? blogs
                : blogs.filter(blog => blog.category === currentBlogCategory);

            // Calculate slice
            const startIndex = (currentBlogPage - 1) * BLOGS_PER_PAGE;
            const endIndex = startIndex + BLOGS_PER_PAGE;
            const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

            // Render Blogs
            if (currentBlogs.length === 0) {
                container.innerHTML = '<div style="text-align: center; grid-column: 1 / -1; color: var(--text-secondary); padding: 2rem 0;">No articles found in this category.</div>';
            } else {
                container.innerHTML = currentBlogs.map(blog => `
                    <div class="blog-card" onclick="window.location.href='${blog.url}'">
                        <div class="blog-meta">
                            <span>${blog.date}</span>
                            <span>•</span>
                            <span>${blog.readTime}</span>
                        </div>
                        <div class="blog-title">${blog.title}</div>
                        <div class="blog-desc">${blog.description}</div>
                    </div>
                `).join('');
            }

            // Render Pagination
            const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

            if (totalPages > 1) {
                let paginationHTML = `<button class="page-btn" ${currentBlogPage === 1 ? 'disabled' : ''} onclick="changeBlogPage(${currentBlogPage - 1})">←</button>`;

                for (let i = 1; i <= totalPages; i++) {
                    paginationHTML += `<button class="page-btn ${currentBlogPage === i ? 'active' : ''}" onclick="changeBlogPage(${i})">${i}</button>`;
                }

                paginationHTML += `<button class="page-btn" ${currentBlogPage === totalPages ? 'disabled' : ''} onclick="changeBlogPage(${currentBlogPage + 1})">→</button>`;
                pagination.innerHTML = paginationHTML;
            } else {
                pagination.innerHTML = '';
            }
        }

        function changeBlogPage(page) {
            const filteredBlogs = currentBlogCategory === 'all'
                ? blogs
                : blogs.filter(blog => blog.category === currentBlogCategory);
            const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
            if (page >= 1 && page <= totalPages) {
                currentBlogPage = page;
                renderBlogs();
                // Scroll to top of blog section instantly to prevent flickering
                window.scrollTo(0, 0);
            }
        }

        // Initialize with home page and render blogs
        document.addEventListener('DOMContentLoaded', function () {
            showPage('home');
            renderBlogs();
        });
